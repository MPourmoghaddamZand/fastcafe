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
        onDelete: 'SET NULL',
        onUpdate: "CASCADE"
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "items",
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: "CASCADE"
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    price_each: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'order_items',
    timestamps: true
})

export default OrderItem;