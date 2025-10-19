import Category from '../models/Category.js';

class CategoryRepository {
    async findAll(query = {}, options = {}) {
        const { limit, skip, sort } = options;
        return await Category.find(query).limit(limit).skip(skip).sort(sort);
    }

    async countDocuments(query = {}) {
        return await Category.countDocuments(query);
    }

    async findById(id) {
        return await Category.findById(id);
    }

    async create(data) {
        const newCategory = new Category(data);
        return await newCategory.save();
    }

    async updateById(id, data) {
        return await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async deleteById(id) {
        return await Category.findByIdAndDelete(id);
    }
}

export default new CategoryRepository();