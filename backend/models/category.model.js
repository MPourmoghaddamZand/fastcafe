import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Category = sequelize.define('categories', {

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
}, {
    tableName: 'categories',
    timestamps: true
})
export default Category;