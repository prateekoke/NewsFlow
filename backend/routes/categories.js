import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ label: 1 });
    
    res.json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    
    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = req.body;
    const category = new Category(categoryData);
    const savedCategory = await category.save();
    
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: savedCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Create multiple categories
router.post('/bulk', async (req, res) => {
  try {
    const categoriesArray = req.body;
    const inserted = await Category.insertMany(categoriesArray, { ordered: false });
    
    res.status(201).json({
      success: true,
      message: `${inserted.length} categories created successfully`,
      data: inserted,
      count: inserted.length,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update a category
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    
    res.json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ id: req.params.id });
    
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    
    res.json({
      success: true,
      message: 'Category deleted successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete all categories
router.delete('/', async (req, res) => {
  try {
    const result = await Category.deleteMany({});
    
    res.json({
      success: true,
      message: `${result.deletedCount} categories deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

