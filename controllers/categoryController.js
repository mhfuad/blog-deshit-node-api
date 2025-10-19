import categoryService from '../services/categoryService.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getCategories = async (req, res) => {
  try {
    const features = new APIFeatures(req.query);
    const { page, limit, sort } = features.getPaginationParams();

    const { data, currentPage, totalPages, totalResults } = await categoryService.getAllCategories(page, limit, sort);

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

export const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server Error');
  }
};

export const createCategory = async (req, res) => {
  try {
    const newCategory = await categoryService.createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) {
        return res.status(400).json({ msg: 'Category name already exists.' });
    }
    res.status(500).send('Server Error');
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body);
    if (!updatedCategory) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    if (err.code === 11000) {
        return res.status(400).json({ msg: 'Category name already exists.' });
    }
    res.status(500).send('Server Error');
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server Error');
  }
};