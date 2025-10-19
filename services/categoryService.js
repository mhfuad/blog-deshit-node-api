import categoryRepository from '../repositories/categoryRepository.js';
import paginationConfig from '../config/pagination.js';

const { defaultPage, defaultLimit } = paginationConfig;

class CategoryService {
    async getAllCategories(page = defaultPage, limit = defaultLimit, sort = { createdAt: -1 }) {
        const skip = (page - 1) * limit;
        const categories = await categoryRepository.findAll({}, { limit, skip, sort });
        const totalCategories = await categoryRepository.countDocuments({});

        return {
            data: categories,
            currentPage: page,
            limit: limit,
            totalPages: Math.ceil(totalCategories / limit),
            totalResults: totalCategories,
        };
    }

    async getCategoryById(id) {
        return await categoryRepository.findById(id);
    }

    async createCategory(data) {
        return await categoryRepository.create(data);
    }

    async updateCategory(id, data) {
        return await categoryRepository.updateById(id, data);
    }

    async deleteCategory(id) {
        return await categoryRepository.deleteById(id);
    }
}

export default new CategoryService();