import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { validateRegistration, validateLogin, handleValidationErrors } from '../utils/validation.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();


router.post('/register', validateRegistration, handleValidationErrors, registerUser);
router.post('/login', validateLogin, handleValidationErrors, loginUser);
router.get('/profile', authMiddleware(), getUserProfile);

export default router;