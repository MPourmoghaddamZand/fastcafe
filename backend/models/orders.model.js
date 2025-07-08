import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Order = sequelize.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: "id"
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
    status: {
        type: DataTypes.ENUM("Waiting", 'Prepair', "Cooking", "Done", 'Cancelled'),
        defaultValue: "Prepair",
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    table_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: true
})

export default Order;