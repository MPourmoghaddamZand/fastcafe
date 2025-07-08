import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FastCafe API',
            version: '1.0.0',
            description: 'API Documentation for FastCafe',
        },
        servers: [
            {
                url: 'http://localhost:5000/api/', // ← آدرس بک‌اند شما
            },
        ],
    },
    apis: ['./backend/lib/swaggerDocs/*.js'], // ← مسیر فایل‌هایی که JSDoc توشون می‌نویسی
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
