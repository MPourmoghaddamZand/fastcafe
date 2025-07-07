import sequelize from "../config/db.js";
import Admin from "./admin.model.js";
import Category from "./category.model.js";
import Item from "./item.model.js";
import OrderItem from "./orderItem.model.js";
import Order from "./orders.model.js";
import User from "./user.model.js";


Category.hasMany(Item, {
    foreignKey: 'category_id',
    as: 'items'
})

Item.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'categorys'
})

User.hasMany(Order, {
    foreignKey: 'user_id',
    as: 'orders'
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

const db = {
    sequelize,
    Item,
    Category,
    User,
    Admin,
    Order,
    OrderItem
}

export default db;