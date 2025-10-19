import postRepository from '../repositories/postRepository.js';
import paginationConfig from '../config/pagination.js';
import path from 'path';
import fs from 'fs';

const { defaultPage, defaultLimit } = paginationConfig;

class PostService {
  async getAllPosts(page = defaultPage, limit = defaultLimit, sort = { createdAt: -1 }) {
    const skip = (page - 1) * limit;
    const posts = await postRepository.findAll({}, { limit, skip, sort });
    const totalPosts = await postRepository.countDocuments({});

    return {
      data: posts,
      currentPage: page,
      limit: limit,
      totalPages: Math.ceil(totalPosts / limit),
      totalResults: totalPosts,
    };
  }

  async getPostById(id) {
    return await postRepository.findById(id);
  }

  async createPost(data, file) {
    if (file) {
      const fileName = `${Date.now()}_${file.originalname}`;
      const uploadPath = path.join('uploads', fileName);
      fs.writeFileSync(uploadPath, file.buffer);
      data.image = fileName;
    }
    return await postRepository.create(data);
  }

  async updatePost(id, data, file) {
    if (file) {
      const fileName = `${Date.now()}_${file.originalname}`;
      const uploadPath = path.join('uploads', fileName);
      fs.writeFileSync(uploadPath, file.buffer);
      data.image = fileName;
    }
    return await postRepository.updateById(id, data);
  }

  async deletePost(id) {
    return await postRepository.deleteById(id);
  }
}

export default new PostService();
