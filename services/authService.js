import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';
import dotenv from 'dotenv';

dotenv.config(); // Ensure env variables are loaded

class AuthService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET;
        this.jwtExpiration = '1h'; // You can get this from config/default.js if you use it
    }

    async registerUser(username, email, password) {
        let user = await userRepository.findByEmail(email);
        if (user) {
            throw new Error('User already exists with this email');
        }

        user = await userRepository.findByUsername(username);
        if (user) {
            throw new Error('User already exists with this username');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            email,
            password: hashedPassword,
            role: 'user', // Default role
        };

        return await userRepository.create(newUser);
    }

    async loginUser(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid Credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid Credentials');
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiration });
        return { token, user: { id: user.id, username: user.username, email: user.email, role: user.role } };
    }

    async getUserProfile(userId) {
        return await userRepository.findById(userId);
    }
}

export default new AuthService();