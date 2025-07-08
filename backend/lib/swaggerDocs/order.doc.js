/**
 * @swagger
 * /orders:
 *   get:
 *     summary: دریافت لیست سفارش‌ها
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: لیست سفارش‌ها
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: دریافت سفارش بر اساس ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: سفارش یافت شد
 *       404:
 *         description: سفارش یافت نشد
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: ایجاد یک سفارش جدید
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - items
 *               - table_number
 *             properties:
 *               user_id:
 *                 type: integer
 *               status:
 *                 type: string
 *               table_number:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     item_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: سفارش با موفقیت ساخته شد
 *       400:
 *         description: داده‌های نامعتبر
 */

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: بروزرسانی سفارش
 *     tags:
 *       - Orders
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               total_price:
 *                 type: number
 *     responses:
 *       200:
 *         description: سفارش بروزرسانی شد
 *       404:
 *         description: سفارش یافت نشد
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: حذف سفارش
 *     tags:
 *       - Orders
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: سفارش حذف شد
 *       404:
 *         description: سفارش یافت نشد
 */
