import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import db from '../models/index.js';
import userRouter from '../routes/user.route.js';

dotenv.config();
const app = express();

// Variant
const PORT = process.env.PORT || 3000;

// Useage
app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// Routes
app.use('/api/users', userRouter)

// Connect DB
db.sequelize.authenticate()
    .then(() => {
        console.log("✅ DB Connected");

        return db.sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log("✅ Models Synced");

        app.listen(PORT, () => {
            console.log("🚀 Server is Running on PORT:", PORT);
        });
    })
    .catch(err => {
        console.error("❌ DB Connection Failed:", err);
    });

// Test


// Server
app.listen(PORT, () => {
    console.log("Server is Running: ", PORT)
})