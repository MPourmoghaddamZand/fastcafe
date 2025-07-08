import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import db from '../models/index.js';
import userRouter from '../routes/user.route.js';
import categoryRouter from '../routes/category.route.js';
import itemRouter from '../routes/item.route.js';
import orderRouter from '../routes/order.route.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../lib/swagger.js';

dotenv.config();
const app = express();

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Variant
const PORT = process.env.PORT || 3000;

// Useage
app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// Routes
app.use('/api/users', userRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/items', itemRouter)
app.use('/api/orders', orderRouter)

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