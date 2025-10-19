import UserRepository from '../repositories/userRepository.js';
import bcrypt from 'bcryptjs';

class UserService {
    async registerUser(userData) {
        const { username, email, password } = userData;

        const existingUserByEmail = await UserRepository.findByEmail(email);
        if (existingUserByEmail) {
            throw new Error('Email already registered.');
        }
        const existingUserByUsername = await UserRepository.findByUsername(username);
        if (existingUserByUsername) {
            throw new Error('Username already taken.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserRepository.create({
            username,
            email,
            password: hashedPassword,
            role: userData.role || 'user'
        });

        const { password: _, ...userWithoutPassword } = newUser._doc;
        return userWithoutPassword;
    }

    async getUsers(page, limit) {
        const skip = (page - 1) * limit;
        const totalUsers = await UserRepository.countDocuments();
        const users = await UserRepository.find({}, skip, limit);

        return {
            users: users.map(user => {
                const { password, ...userWithoutPassword } = user._doc;
                return userWithoutPassword;
            }),
            currentPage: page,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers
        };
    }

    async getUserById(id) {
        const user = await UserRepository.findById(id);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    }

    async updateUser(id, updateData) {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        if (updateData.email) {
            const existingUserByEmail = await UserRepository.findByEmail(updateData.email);
            if (existingUserByEmail && String(existingUserByEmail._id) !== id) {
                throw new Error('Email already registered by another user.');
            }
        }
        if (updateData.username) {
            const existingUserByUsername = await UserRepository.findByUsername(updateData.username);
            if (existingUserByUsername && String(existingUserByUsername._id) !== id) {
                throw new Error('Username already taken by another user.');
            }
        }

        const updatedUser = await UserRepository.update(id, updateData);
        if (!updatedUser) {
            throw new Error('User not found.');
        }
        return updatedUser;
    }

    async deleteUser(id) {
        const deletedUser = await UserRepository.delete(id);
        if (!deletedUser) {
            throw new Error('User not found.');
        }
        return { message: 'User deleted successfully.' };
    }
}

export default new UserService();