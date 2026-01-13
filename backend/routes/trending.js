import express from 'express';
import Trending from '../models/Trending.js';

const router = express.Router();

// Get all trending stories (sorted by rank)
router.get('/', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const trending = await Trending.find()
      .sort({ rank: 1 })
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: trending,
      count: trending.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a single trending story by rank
router.get('/rank/:rank', async (req, res) => {
  try {
    const trending = await Trending.findOne({ rank: parseInt(req.params.rank) });
    
    if (!trending) {
      return res.status(404).json({ success: false, error: 'Trending story not found' });
    }
    
    res.json({
      success: true,
      data: trending,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a single trending story by ID
router.get('/:id', async (req, res) => {
  try {
    const trending = await Trending.findById(req.params.id);
    
    if (!trending) {
      return res.status(404).json({ success: false, error: 'Trending story not found' });
    }
    
    res.json({
      success: true,
      data: trending,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new trending story
router.post('/', async (req, res) => {
  try {
    const trendingData = req.body;
    const trending = new Trending(trendingData);
    const savedTrending = await trending.save();
    
    res.status(201).json({
      success: true,
      message: 'Trending story created successfully',
      data: savedTrending,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Create multiple trending stories
router.post('/bulk', async (req, res) => {
  try {
    const trendingArray = req.body;
    const inserted = await Trending.insertMany(trendingArray, { ordered: false });
    
    res.status(201).json({
      success: true,
      message: `${inserted.length} trending stories created successfully`,
      data: inserted,
      count: inserted.length,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update a trending story
router.put('/:id', async (req, res) => {
  try {
    const trending = await Trending.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!trending) {
      return res.status(404).json({ success: false, error: 'Trending story not found' });
    }
    
    res.json({
      success: true,
      message: 'Trending story updated successfully',
      data: trending,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete a trending story
router.delete('/:id', async (req, res) => {
  try {
    const trending = await Trending.findByIdAndDelete(req.params.id);
    
    if (!trending) {
      return res.status(404).json({ success: false, error: 'Trending story not found' });
    }
    
    res.json({
      success: true,
      message: 'Trending story deleted successfully',
      data: trending,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete all trending stories
router.delete('/', async (req, res) => {
  try {
    const result = await Trending.deleteMany({});
    
    res.json({
      success: true,
      message: `${result.deletedCount} trending stories deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

