import express from 'express';
import categoryRoutes from './categoryRoute.js';
import authRoutes from './authRoute.js';
import userRoutes from './userRoute.js';
import postRoutes from './postRoutes.js';

const router = express.Router();

router.use('/category', categoryRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);

export default router;