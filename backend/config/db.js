import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();
const {
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_HOST
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: "postgres",
    logging: true
})

export default sequelize