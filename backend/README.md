# NewsFlow Backend API

This is the backend server for NewsFlow, providing RESTful API endpoints to interact with MongoDB.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` (optional, defaults are provided)
   - Update MongoDB connection string if needed
   ```env
   MONGODB_URI=mongodb://localhost:27017/newsflow
   MONGODB_DB_NAME=newsflow
   PORT=3001
   ```

3. **Make sure MongoDB is running:**
   - Ensure MongoDB Compass is connected to `mongodb://localhost:27017`
   - Or use the MongoDB service running on your system

## Running the Server

```bash
# Start the server
npm run server

# Start the server with auto-reload (requires Node.js 18+)
npm run server:dev
```

The server will start on `http://localhost:3001`

## Seeding the Database

To populate the database with sample data:

```bash
npm run seed
```

This will:
- Clear existing data (optional - can be modified in seed.js)
- Insert categories
- Insert news articles (including featured news)
- Insert trending stories

## API Endpoints

### Health Check
- `GET /api/health` - Check server and database status

### News Articles
- `GET /api/news` - Get all news articles
  - Query params: `category`, `limit`, `skip`
- `GET /api/news/featured` - Get featured news article
- `GET /api/news/category/:category` - Get news by category
- `GET /api/news/:id` - Get a single news article by ID
- `POST /api/news` - Create a new news article
- `POST /api/news/bulk` - Create multiple news articles
- `PUT /api/news/:id` - Update a news article
- `DELETE /api/news/:id` - Delete a news article
- `DELETE /api/news` - Delete all news articles

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a single category by ID
- `POST /api/categories` - Create a new category
- `POST /api/categories/bulk` - Create multiple categories
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category
- `DELETE /api/categories` - Delete all categories

### Trending Stories
- `GET /api/trending` - Get all trending stories (sorted by rank)
  - Query params: `limit`
- `GET /api/trending/rank/:rank` - Get trending story by rank
- `GET /api/trending/:id` - Get a single trending story by ID
- `POST /api/trending` - Create a new trending story
- `POST /api/trending/bulk` - Create multiple trending stories
- `PUT /api/trending/:id` - Update a trending story
- `DELETE /api/trending/:id` - Delete a trending story
- `DELETE /api/trending` - Delete all trending stories

## Example Requests

### Create a News Article
```bash
curl -X POST http://localhost:3001/api/news \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Technology Breakthrough",
    "excerpt": "Scientists discover new technology...",
    "image": "/path/to/image.jpg",
    "category": "Technology",
    "readTime": "5 min read",
    "source": "Tech News"
  }'
```

### Get All News Articles
```bash
curl http://localhost:3001/api/news
```

### Get News by Category
```bash
curl http://localhost:3001/api/news/category/Technology
```

### Seed Database
```bash
npm run seed
```

## Database Models

### News
- `title` (String, required)
- `excerpt` (String, required)
- `image` (String, required)
- `category` (String, enum, required)
- `readTime` (String, required)
- `source` (String, required)
- `isFeatured` (Boolean, default: false)
- `views` (Number, default: 0)
- `createdAt` (Date)
- `updatedAt` (Date)

### Category
- `id` (String, required, unique)
- `label` (String, required)
- `icon` (String)
- `createdAt` (Date)
- `updatedAt` (Date)

### Trending
- `rank` (Number, required, unique, 1-100)
- `title` (String, required)
- `category` (String, required)
- `views` (String, required)
- `createdAt` (Date)
- `updatedAt` (Date)

## MongoDB Compass

After running the seed script, you can view the data in MongoDB Compass:

1. Connect to: `mongodb://localhost:27017`
2. Select database: `newsflow`
3. View collections:
   - `news` - All news articles
   - `categories` - All categories
   - `trendings` - All trending stories

