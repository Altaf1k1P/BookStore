import  {Book}  from "../models/Books.js";
import CartBook from "../models/CartBook.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

// @desc    Add a book from Cart
// @route   POST /api/Cart
// @access  Private
const AddToCart = asyncHandler(async (req, res) => {
    //  step 1 user Id
    const userId = req.user._id;
    // step 2 bookId from param (url)
    const {bookId} = req.params;
    // check user is Auth.
    if(!userId) throw new ApiError(401,"User not authenticated");
    // check bookId is valid
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
  throw new ApiError(400,'Invalid book ID');
}
// check book is exist in db
const book = await Book.findById(bookId);
if (!book) {
  throw new ApiError(404,'Book not found');
}
  // 4. Check current quantity
  const existingItem = await CartBook.findOne({ user: userId, book: bookId });

  if (existingItem) {
    if (existingItem.quantity >= 10) {
      throw new ApiError(400,'Maximum quantity for this item reached');
    }

    // Safe quantity increase
    existingItem.quantity += 1;
    await existingItem.save();
    res.status(200).json(existingItem);
  } else {
    // New item
    const newItem = await CartBook.create({ user: userId, book: bookId, quantity: 1 });
    res.status(201).json(newItem);
  }
})

// @desc    get a book from Cart
// @route   GET /api/Cart/:bookId
// @access  Private
const GetCartItem = asyncHandler(async(req, res) => {
    const {userId} = req.user._id;
    if(!userId)  throw new ApiError(400,"user is not Authanticated")
  const CartItem = await CartBook.find({ user: userId }).populate('book');

  if(!CartBook) throw new ApiError(500,"server errer cartitem is not fatching");
  
   res.status(200).json(CartItem);
})

// @desc    Remove a book from Cart
// @route   DELETE /api/Cart/:bookId
// @access  Private
const RemoveBookFromCart = asyncHandler(async (req, res) => {

})


export {
    AddToCart,
    GetCartItem,
    RemoveBookFromCart
}