import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const OrderItem = sequelize.define('order_items', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "orders",
            key: 'id',
        },
        onDelete: 'CASCADE',   // اگر سفارش حذف شد، این آیتم هم حذف شود
        onUpdate: "CASCADE"
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "items",
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: "CASCADE"
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    price_each: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'order_items',
    timestamps: false
});

export default OrderItem;
