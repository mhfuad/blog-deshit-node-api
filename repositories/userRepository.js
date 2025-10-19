import User from '../models/User.js';

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findByUsername(username) {
      return await User.findOne({ username });
    }

    async findById(id) {
        return await User.findById(id).select('-password'); // Don't return password
    }

    async create(userData) {
        const newUser = new User(userData);
        return await newUser.save();
    }

    async countDocuments() {
        return await User.countDocuments();
    }

    async find(query = {}, skip = 0, limit = 0) {
        return await User.find(query).skip(skip).limit(limit).select('-password');
    }

    async update(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
}

export default new UserRepository();