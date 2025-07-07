import Category from "../models/category.model.js";

// ✅ گرفتن همه کتگوری‌ها
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({});
        res.status(200).json({ success: true, data: categories });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// ✅ گرفتن کتگوری با آیدی
export const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);

        if (!category)
            return res.status(404).json({ success: false, error: 'Category not found' });

        res.status(200).json({ success: true, data: category });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// ✅ ساخت کتگوری جدید
export const createCategory = async (req, res) => {
    const { name, description } = req.body;

    if (!name)
        return res.status(400).json({ success: false, error: 'Fill all fields' });

    try {
        const newCategory = await Category.create({ name, description });
        res.status(201).json({ success: true, data: newCategory });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// ✅ ویرایش کتگوری
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const [affected, updated] = await Category.update(
            { name, description },
            { where: { id }, returning: true }
        );

        if (affected === 0)
            return res.status(404).json({ success: false, error: 'Category not found' });

        res.status(200).json({ success: true, data: updated[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

// ✅ حذف کتگوری
export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Category.destroy({ where: { id } });

        if (!deleted)
            return res.status(404).json({ success: false, error: 'Category not found' });

        res.status(200).json({ success: true, message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
