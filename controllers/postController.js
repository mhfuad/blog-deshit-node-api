import postService from '../services/postService.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getPosts = async (req, res) => {
  try {
    const features = new APIFeatures(req.query);
    const { page, limit, sort } = features.getPaginationParams();

    const { data, currentPage, totalPages, totalResults } = await postService.getAllPosts(page, limit, sort);

    res.json({
      status: 'success',
      results: data.length,
      pagination: {
        currentPage,
        totalPages,
        limit,
        totalResults,
      },
      data: data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = await postService.createPost(req.body, req.file);
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(req.params.id, req.body, req.file);
    if (!updatedPost) return res.status(404).json({ msg: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deletePost = async (req, res) => {
  try {
    const deleted = await postService.deletePost(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Post not found' });
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
