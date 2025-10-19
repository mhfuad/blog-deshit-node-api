import { body, validationResult } from 'express-validator';

export const validateRegistration = [
  body('username', 'Username is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

export const validateLogin = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').not().isEmpty(),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};