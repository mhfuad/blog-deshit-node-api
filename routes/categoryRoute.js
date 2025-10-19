import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', authMiddleware(), createCategory);
router.put('/:id', authMiddleware(['admin']), updateCategory);
router.delete('/:id', deleteCategory);

export default router;