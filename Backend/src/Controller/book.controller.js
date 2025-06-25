// controllers/book.controller.js
import { Book } from "../models/Books.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../Utils/cloudinary.js";

// ✅ Admin adds a book
 const addBook = asyncHandler(async (req, res) => {
  const { title, author, description } = req.body;

  if (!req.file) {
    throw new ApiError(400, "Cover image is required");
  }

  const cloudResult = await uploadOnCloudinary(req.file.path);
  if (!cloudResult) {
    throw new ApiError(500, "Failed to upload cover image");
  }
//  console.log(cloudResult);
 
  const book = await Book.create({
    title,
    author,
    description,
    coverImage: {
      url: cloudResult.url,
      public_id: cloudResult.public_id,
    },
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Book added successfully",
    book,
  });
});

// ✅ Get all books with search, pagination, sorting
const getAllBooks = asyncHandler(async (req, res) => {
  const { search = "", page = 1, limit = 10, sort = "desc" } = req.query;

  const query = {
    title: { $regex: search, $options: "i" },
  };

  const total = await Book.countDocuments(query);

  const books = await Book.find(query)
    .sort({ createdAt: sort === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .select("_id coverImage title author averageRating"); 

  res.status(200).json({
    success: true,
    total,
    page: Number(page),
    books,
  });
});



// ✅ Get single book details
 const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id)
  .populate('reviews.user', 'username avatar');;
  if (!book) throw new ApiError(404, "Book not found");

  res.status(200).json({
    success: true,
    book,
  });
});

// ✅ Get 4 recent books
 const getRecentBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 }).limit(4);

  res.status(200).json({
    success: true,
    books,
  });
});

// ✅ Add review to book
 const addReview = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user._id;

  if (!rating) throw new ApiError(400, "Rating is required");

  const book = await Book.findById(bookId);
  if (!book) throw new ApiError(404, "Book not found");

  const alreadyReviewed = book.reviews.find((r) => r.user.toString() === userId.toString());
  if (alreadyReviewed) throw new ApiError(400, "Book already reviewed by this user");

  const review = {
    user: userId,
    rating: Number(rating),
    comment,
  };

  book.reviews.push(review);
  book.numReviews = book.reviews.length;
  book.averageRating = book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.numReviews;

  await book.save();

  res.status(201).json({
    success: true,
    message: "Review added",
    book,
  });
});


// img update
export const imageUpdate = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  // 1. Find book
  const book = await Book.findById(bookId);
  if (!book) throw new ApiError(404, "Book not found");

  // 2. Check for uploaded file
  const localFilePath = req.file?.path;
  if (!localFilePath) throw new ApiError(400, "No image file uploaded");

  // 3. Delete previous image if exists
  if (book.coverImage?.public_id) {
    await deleteFromCloudinary(book.coverImage.public_id);
  }

  // 4. Upload new image to Cloudinary
  const uploadedImage = await uploadOnCloudinary(localFilePath);
  if (!uploadedImage) throw new ApiError(500, "Failed to upload image");

  // 5. Update book with new image details
  book.coverImage = {
    url: uploadedImage.url,
    public_id: uploadedImage.public_id,
  };
  await book.save();

  // 6. Response
  res.status(200).json({
    success: true,
    message: "Book cover image updated successfully",
    data: {
      coverImage: book.coverImage.url,
      publicId: book.coverImage.public_id,
    },
  });
});


export {
    addBook,
    addReview,
    getAllBooks,
    getRecentBooks,
    getBookById
}
