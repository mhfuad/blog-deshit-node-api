import express from 'express';
import multer from 'multer';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
const upload = multer(); // in-memory for now

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', upload.single('image'), createPost);
router.put('/:id', authMiddleware(['admin']), upload.single('image'), updatePost);
router.delete('/:id', authMiddleware(['admin']), deletePost);

export default router;
