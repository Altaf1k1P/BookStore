import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: String,
}, { timestamps: true });

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  category: String,
  publishedYear: Number,
  coverImage: {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  reviews: [reviewSchema],
  numReviews: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Book = mongoose.model('Book', bookSchema);
