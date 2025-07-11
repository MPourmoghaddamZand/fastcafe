import Item from '../models/item.model.js';
import Category from '../models/category.model.js';

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll({
            include: [{ model: Category, as: 'categories' }]
        });
        res.status(200).json({ success: true, data: items });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

export const getItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByPk(id, {
            include: [{ model: Category, as: 'categories' }]
        });

        if (!item)
            return res.status(404).json({ success: false, error: 'Item not found' });

        res.status(200).json({ success: true, data: item });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

export const createItem = async (req, res) => {
    const { name, description, price, image, category_id } = req.body;

    if (!name || !category_id)
        return res.status(400).json({ success: false, error: 'Fill all required fields' });

    try {
        const newItem = await Item.create({
            name,
            description,
            price,
            image,
            category_id
        });

        res.status(201).json({ success: true, data: newItem });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, category_id } = req.body;

    try {
        const [affected, updated] = await Item.update(
            { name, description, price, image, category_id },
            { where: { id }, returning: true }
        );

        if (affected === 0)
            return res.status(404).json({ success: false, error: 'Item not found' });

        res.status(200).json({ success: true, data: updated[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

export const deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Item.destroy({ where: { id } });

        if (!deleted)
            return res.status(404).json({ success: false, error: 'Item not found' });

        res.status(200).json({ success: true, message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};

export const getItemsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ success: false, error: 'Category not found' });
        }
        const items = await Item.findAll({
            where: { category_id: categoryId },
            include: [{ model: Category, as: 'categories' }]
        });

        res.status(200).json({ success: true, data: items });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
