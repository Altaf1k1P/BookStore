import FavoriteBook from "../models/FavoriteBook.js";
import { Book } from "../models/Books.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

// @desc    Add a book to user's favorites
// @route   POST /api/favorites/:bookId
// @access  Private
const AddFavoriteBook = asyncHandler(async (req, res) => {

    // get user id from user
    const userId = req.user._id
    // get book id from params
    const { bookId } = req.params;
    // Optional: Check if book exists
    const book = await Book.findById(bookId);
    if (!book) throw new ApiError(400,'Book not found');
    const exist = await FavoriteBook.findOne({ user: userId, book: bookId });
    if (exist) {
        throw new ApiError(400, 'Book is already in favorites');
    }
    const AddToFavorite = await FavoriteBook.create({ user: userId, book: bookId });
    if (!AddToFavorite) {
        throw new ApiError(500, "Failed to add book to favorites");
    }
    res.status(201).json({ success: true, message: "Book added to favorites" });
})

// @desc    Remove a book from favorites
// @route   DELETE /api/favorites/:bookId
// @access  Private
const RemoveFavoriteBook = asyncHandler(async (req, res)=>{
    // bookid from params
    // userid from user
  const { bookId } = req.params;
  const userId = req.user._id;


  const removed = await FavoriteBook.findOneAndDelete({ user: userId, book: bookId });

  if (!removed) {
    throw new ApiError(404,'Favorite not found')
  }
  res.status(200).json({ message: 'Removed from favorites' });
})

// @desc     get Favorite Book
// @route   GET /api/favorites
// @access  Private
const GetFavoriteBook = asyncHandler(async (req, res) => {
    const favorites = await FavoriteBook.find({ user: req.user._id }).populate('book');
  res.status(200).json(favorites);
})

export{
    AddFavoriteBook,
    RemoveFavoriteBook,
    GetFavoriteBook
}