/**
 * @swagger
 * tags:
 *   - name: Items
 *     description: مدیریت آیتم‌های منو
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: دریافت تمام آیتم‌ها
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: لیست آیتم‌ها بازیابی شد
 */

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: دریافت یک آیتم خاص با آیدی
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: آیتم یافت شد
 *       404:
 *         description: آیتم پیدا نشد
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: ساخت آیتم جدید
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               category_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: آیتم با موفقیت ایجاد شد
 *       400:
 *         description: اطلاعات ناقص
 */

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: ویرایش اطلاعات آیتم
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: آیتم بروزرسانی شد
 *       404:
 *         description: آیتم پیدا نشد
 */

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: حذف آیتم
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: حذف موفق
 *       404:
 *         description: آیتم وجود ندارد
 */

/**
 * @swagger
 * /items/category/{categoryId}:
 *   get:
 *     summary: دریافت آیتم‌ها بر اساس دسته‌بندی
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: لیست آیتم‌ها در این دسته‌بندی
 *       404:
 *         description: دسته‌بندی یافت نشد
 */
