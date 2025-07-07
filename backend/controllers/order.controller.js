import Order from '../models/orders.model.js';
import OrderItem from '../models/orderItem.model.js';
import User from '../models/user.model.js';
import Item from '../models/item.model.js';

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
                { model: OrderItem, as: 'order_items', include: [{ model: Item }] }
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
    const { user_id, status } = req.body;

    if (!user_id) {
        return res.status(400).json({ success: false, error: 'user_id is required' });
    }

    try {
        const newOrder = await Order.create({
            user_id,
            status: status || 'pending',
            total_price: 0
        });

        // بعد از ایجاد سفارش، مجموع قیمت رو به روز کن
        await updateOrderTotalPrice(newOrder.id);
        // دوباره سفارش رو بگیر تا با total_price به روز شده ارسال کنی
        const updatedOrder = await Order.findByPk(newOrder.id);

        res.status(201).json({ success: true, data: updatedOrder });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};


// آپدیت وضعیت یا اطلاعات سفارش
async function updateOrderTotalPrice(order_id) {
    const items = await OrderItem.findAll({ where: { order_id } });
    const total = items.reduce((sum, item) => sum + item.quantity * item.price_each, 0);
    await Order.update({ total_price: total }, { where: { id: order_id } });
}

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