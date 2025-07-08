import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Item = sequelize.define('items', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categories',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
}, {
    tableName: 'items',
    timestamps: true
})

export default Item;