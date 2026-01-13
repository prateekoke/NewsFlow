import express from 'express';
import News from '../models/News.js';

const router = express.Router();

// Get all news articles
router.get('/', async (req, res) => {
  try {
    const { category, limit = 100, skip = 0 } = req.query;
    const query = category && category !== 'all' ? { category } : {};
    
    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await News.countDocuments(query);
    
    res.json({
      success: true,
      data: news,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get featured news
router.get('/featured', async (req, res) => {
  try {
    const featured = await News.findOne({ isFeatured: true })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: featured,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get news by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const news = await News.find({ category })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: news,
      count: news.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get a single news article by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ success: false, error: 'News article not found' });
    }
    
    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new news article
router.post('/', async (req, res) => {
  try {
    const newsData = req.body;
    const news = new News(newsData);
    const savedNews = await news.save();
    
    res.status(201).json({
      success: true,
      message: 'News article created successfully',
      data: savedNews,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Create multiple news articles
router.post('/bulk', async (req, res) => {
  try {
    const newsArray = req.body;
    const inserted = await News.insertMany(newsArray, { ordered: false });
    
    res.status(201).json({
      success: true,
      message: `${inserted.length} news articles created successfully`,
      data: inserted,
      count: inserted.length,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update a news article
router.put('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!news) {
      return res.status(404).json({ success: false, error: 'News article not found' });
    }
    
    res.json({
      success: true,
      message: 'News article updated successfully',
      data: news,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete a news article
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    
    if (!news) {
      return res.status(404).json({ success: false, error: 'News article not found' });
    }
    
    res.json({
      success: true,
      message: 'News article deleted successfully',
      data: news,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete all news articles
router.delete('/', async (req, res) => {
  try {
    const result = await News.deleteMany({});
    
    res.json({
      success: true,
      message: `${result.deletedCount} news articles deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

