import mongoose from 'mongoose';

const trendingSchema = new mongoose.Schema({
  rank: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 100,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  views: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

trendingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient sorting
trendingSchema.index({ rank: 1 });

const Trending = mongoose.model('Trending', trendingSchema);

export default Trending;

