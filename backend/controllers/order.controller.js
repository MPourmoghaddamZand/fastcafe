import Order from '../models/orders.model.js';
import OrderItem from '../models/orderItem.model.js';
import User from '../models/user.model.js';
import Item from '../models/item.model.js';
import sequelize from '../config/db.js';

// گرفتن همه سفارش‌ها با جزئیات کاربر و آیتم‌ها
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, as: 'user' }, // ← اصلاح شد
                {
                    model: OrderItem,
                    as: 'order_items',
                    include: [{ model: Item, as: 'item' }] // ← مطمئن شو association تعریف شده
                }
            ]
        });

        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message || err });
    }
};
// گرفتن سفارش بر اساس id با جزئیات
export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id, {
            include: [
                { model: User, as: 'user' },
                { model: OrderItem, as: 'order_items', include: [{ model: Item, as: 'item' }] }
            ]
        });

        if (!order)
            return res.status(404).json({ success: false, error: 'Order not found' });

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

export const createOrder = async (req, res) => {
    const { user_id, status = 'Waiting', items, table_number } = req.body;

    if (!table_number) {
        return res.status(400).json({
            success: false,
            error: 'Select Table'
        });
    }

    // 1. اعتبارسنجی اولیه
    if (!user_id || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            success: false,
            error: 'user_id and items (non-empty array) are required'
        });
    }

    try {
        // 2. اجرای تراکنش حرفه‌ای با callback
        const newOrder = await sequelize.transaction(async (t) => {
            // 2.1 بررسی وجود کاربر
            const user = await User.findByPk(user_id);
            if (!user) throw new Error('User not found');

            // 2.2 ساخت سفارش
            const order = await Order.create({
                user_id,
                status,
                table_number,
                totalPrice: 0 // به‌روز خواهد شد
            }, { transaction: t });

            let totalPrice = 0;

            // 2.3 پردازش و ذخیره آیتم‌ها
            for (const item of items) {
                const dbItem = await Item.findByPk(item.item_id);
                if (!dbItem) {
                    throw new Error(`Item with id ${item.item_id} not found`);
                }

                const quantity = item.quantity || 1;
                const priceEach = dbItem.price;
                const subtotal = priceEach * quantity;

                totalPrice += subtotal;

                await OrderItem.create({
                    order_id: order.id,
                    item_id: dbItem.id,
                    quantity,
                    price_each: priceEach
                }, { transaction: t });
            }

            // 2.4 به‌روزرسانی مجموع قیمت
            await order.update({ totalPrice }, { transaction: t });

            return order;
        });

        // 3. گرفتن سفارش کامل بعد از commit
        const fullOrder = await Order.findByPk(newOrder.id, {
            include: [
                {
                    model: OrderItem,
                    as: 'order_items',
                    include: [{ model: Item, as: 'item' }]
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                }
            ]
        });

        return res.status(201).json({ success: true, data: fullOrder });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message || 'Server error'
        });
    }
};

// حذف سفارش
export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Order.destroy({ where: { id } });

        if (!deleted)
            return res.status(404).json({ success: false, error: 'Order not found' });

        res.status(200).json({ success: true, message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// آپدیت وضعیت یا اطلاعات سفارش
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status, total_price } = req.body;

    try {
        const [affected, updated] = await Order.update(
            { status, total_price },
            { where: { id }, returning: true }
        );

        if (affected === 0)
            return res.status(404).json({ success: false, error: 'Order not found' });

        res.status(200).json({ success: true, data: updated[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};// آپدیت وضعیت یا اطلاعات سفارش