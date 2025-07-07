import sequelize from "../config/db.js";
import Admin from "./admin.model.js";
import Category from "./category.model.js";
import Item from "./item.model.js";
import OrderItem from "./orderItem.model.js";
import Order from "./orders.model.js";
import User from "./user.model.js";

// Category ↔ Item
Category.hasMany(Item, {
    foreignKey: 'category_id',
    as: 'items'
});
Item.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'categorys'
});

// User ↔ Order
User.hasMany(Order, {
    foreignKey: 'user_id',
    as: 'orders'
});
Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// Order ↔ OrderItem
Order.hasMany(OrderItem, {
    foreignKey: 'order_id',
    as: 'order_items'
});
OrderItem.belongsTo(Order, {
    foreignKey: 'order_id',
    as: 'order' // ← اصلاح شد
});

// Item ↔ OrderItem
Item.hasMany(OrderItem, {
    foreignKey: 'item_id',
    as: 'order_items'
});
OrderItem.belongsTo(Item, {
    foreignKey: 'item_id',
    as: 'item' // ← برای include کردن Item در OrderItem
});

const db = {
    sequelize,
    Item,
    Category,
    User,
    Admin,
    Order,
    OrderItem
};

export default db;
