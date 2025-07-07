import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    tableName: 'users',
    timestamps: true
})

export default User;