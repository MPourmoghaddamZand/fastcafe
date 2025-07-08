/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: عملیات مربوط به کاربران
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: دریافت لیست تمام کاربران
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: موفق
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: دریافت کاربر خاص با آیدی
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: کاربر یافت شد
 *       404:
 *         description: کاربر وجود ندارد
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: ایجاد کاربر جدید
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: کاربر ایجاد شد
 *       400:
 *         description: فیلد ناقص
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: ویرایش کاربر
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: ویرایش موفق
 *       400:
 *         description: مشکل در ویرایش
 */

/**
 * @swagger
 * /users/del/{id}:
 *   put:
 *     summary: حذف نرم (Soft Delete) کاربر
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: حذف نرم موفق
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: حذف کامل کاربر
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: حذف موفق
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: ورود کاربر
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: ورود موفق
 *       401:
 *         description: اطلاعات ورود نادرست
 */
