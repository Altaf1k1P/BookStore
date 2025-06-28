import mongoose, { Schema } from 'mongoose';

const cartBookSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, default: 1, min: 1 },
}, {
  timestamps: {
    createdAt: true
  }
});

export default mongoose.model('CartBook', cartBookSchema);
