import mongoose from 'mongoose';
import dotenv from 'dotenv';
import News from './models/News.js';
import Category from './models/Category.js';
import Trending from './models/Trending.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/newsflow';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'newsflow';

// Sample data
const categories = [
  { id: 'all', label: 'All News', icon: 'Globe' },
  { id: 'tech', label: 'Technology', icon: 'Laptop' },
  { id: 'business', label: 'Business', icon: 'TrendingUp' },
  { id: 'sports', label: 'Sports', icon: 'Gamepad2' },
  { id: 'entertainment', label: 'Entertainment', icon: 'Film' },
];

const featuredNews = {
  title: "Breaking: Major Developments in Global Technology Sector",
  excerpt: "Industry leaders announce groundbreaking collaboration that could reshape the future of innovation and digital transformation worldwide.",
  image: "/src/assets/hero-news.jpg",
  category: "Technology",
  readTime: "8 min read",
  source: "NewsFlow Exclusive",
  isFeatured: true,
};

const newsArticles = [
  {
    title: "AI Revolution: How Machine Learning is Transforming Industries",
    excerpt: "Artificial intelligence continues to reshape business operations and consumer experiences across multiple sectors.",
    image: "/src/assets/tech-news.jpg",
    category: "Technology",
    readTime: "5 min read",
    source: "Tech Today",
  },
  {
    title: "Global Markets React to Economic Policy Shifts",
    excerpt: "Financial analysts discuss the implications of recent policy changes on international trade and investment.",
    image: "/src/assets/business-news.jpg",
    category: "Business",
    readTime: "6 min read",
    source: "Business Wire",
  },
  {
    title: "Championship Finals Draw Record-Breaking Viewership",
    excerpt: "Sports fans worldwide tune in for the most-watched championship game in recent history.",
    image: "/src/assets/sports-news.jpg",
    category: "Sports",
    readTime: "4 min read",
    source: "Sports Daily",
  },
  {
    title: "New Entertainment Platforms Revolutionize Content Streaming",
    excerpt: "Innovative streaming services introduce features that enhance user experience and content discovery.",
    image: "/src/assets/entertainment-news.jpg",
    category: "Entertainment",
    readTime: "5 min read",
    source: "Entertainment Weekly",
  },
  {
    title: "Sustainable Technology Solutions Gain Momentum",
    excerpt: "Green tech initiatives show promising results in reducing carbon footprint across tech industry.",
    image: "/src/assets/tech-news.jpg",
    category: "Technology",
    readTime: "7 min read",
    source: "Eco Tech",
  },
  {
    title: "Startup Funding Reaches New Heights This Quarter",
    excerpt: "Venture capital investments surge as investors show confidence in emerging markets and innovative startups.",
    image: "/src/assets/business-news.jpg",
    category: "Business",
    readTime: "5 min read",
    source: "Startup News",
  },
];

const trendingStories = [
  { rank: 1, title: "Tech Giant Announces Revolutionary Product Line", category: "Technology", views: "2.5M views" },
  { rank: 2, title: "Global Summit Addresses Climate Action", category: "World", views: "1.8M views" },
  { rank: 3, title: "Breakthrough in Medical Research Announced", category: "Health", views: "1.5M views" },
  { rank: 4, title: "Cultural Festival Celebrates International Unity", category: "Culture", views: "1.2M views" },
  { rank: 5, title: "Space Exploration Reaches New Milestone", category: "Science", views: "950K views" },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB_NAME,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - remove if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await News.deleteMany({});
    await Category.deleteMany({});
    await Trending.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert Categories
    console.log('📁 Inserting categories...');
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ ${insertedCategories.length} categories inserted`);

    // Insert News Articles (including featured)
    console.log('📰 Inserting news articles...');
    const allNews = [featuredNews, ...newsArticles];
    const insertedNews = await News.insertMany(allNews);
    console.log(`✅ ${insertedNews.length} news articles inserted`);

    // Insert Trending Stories
    console.log('🔥 Inserting trending stories...');
    const insertedTrending = await Trending.insertMany(trendingStories);
    console.log(`✅ ${insertedTrending.length} trending stories inserted`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`\nSummary:`);
    console.log(`- Categories: ${insertedCategories.length}`);
    console.log(`- News Articles: ${insertedNews.length} (${insertedNews.filter(n => n.isFeatured).length} featured)`);
    console.log(`- Trending Stories: ${insertedTrending.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 MongoDB connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();

