import mongoose, { Schema } from 'mongoose';

const favoriteBookSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
}, {
  timestamps: true
});

export default mongoose.model('FavoriteBook', favoriteBookSchema);
