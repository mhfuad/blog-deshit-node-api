import Post from '../models/Post.js';

class PostRepository {
  async findAll(query = {}, options = {}) {
    const { limit, skip, sort } = options;
    return await Post.find(query)
      .populate('author category')
      .limit(limit)
      .skip(skip)
      .sort(sort);
  }

  async countDocuments(query = {}) {
    return await Post.countDocuments(query);
  }

  async findById(id) {
    return await Post.findById(id).populate('author category');
  }

  async create(data) {
    const newPost = new Post(data);
    return await newPost.save();
  }

  async updateById(id, data) {
    return await Post.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteById(id) {
    return await Post.findByIdAndDelete(id);
  }
}

export default new PostRepository();
