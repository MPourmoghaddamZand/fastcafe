import express from 'express';
import {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getItemsByCategory
} from '../controllers/item.controller.js';

const itemRouter = express.Router();

itemRouter.get('/', getAllItems);
itemRouter.get('/:id', getItemById);
itemRouter.post('/', createItem);
itemRouter.put('/:id', updateItem);
itemRouter.delete('/:id', deleteItem);
itemRouter.get('/category/:categoryId', getItemsByCategory);

export default itemRouter;
