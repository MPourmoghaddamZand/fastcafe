/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: مدیریت دسته‌بندی‌های منو
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: دریافت تمام دسته‌بندی‌ها
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: لیست دسته‌بندی‌ها با موفقیت دریافت شد
 */

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: دریافت یک دسته‌بندی خاص با آیدی
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: دسته‌بندی یافت شد
 *       404:
 *         description: دسته‌بندی پیدا نشد
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: ساخت دسته‌بندی جدید
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: دسته‌بندی با موفقیت ایجاد شد
 *       400:
 *         description: نام دسته‌بندی الزامی است
 */

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: ویرایش دسته‌بندی
 *     tags: [Categories]
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
 *     responses:
 *       200:
 *         description: دسته‌بندی بروزرسانی شد
 *       404:
 *         description: دسته‌بندی پیدا نشد
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: حذف دسته‌بندی
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: دسته‌بندی حذف شد
 *       404:
 *         description: دسته‌بندی وجود ندارد
 */
