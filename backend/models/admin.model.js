import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Admin = sequelize.define('admins', {
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
    role: {
        type: DataTypes.ENUM('superadmin', "admin"),
        defaultValue: "admin"
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'admins',
    timestamps: true
})

export default Admin;