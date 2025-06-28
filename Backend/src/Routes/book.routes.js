import {Router} from 'express';
import { getAllBooks, getBookById, getRecentBooks, addBook, addReview, imageUpdate } from '../Controller/book.controller.js'; 
import { verifyAccessToken } from '../middleware/verifyAccessToken.js';
import { isAdmin } from '../middleware/middleware.isAdmin.js';
import { upload } from "../middleware/multer.middleware.js";


const router = Router();


router.post(
    "/book-add",
  verifyAccessToken,
  isAdmin,
  upload.single("coverImage"),
   addBook
);
router.get('/books', getAllBooks);
router.get('/books/recent', getRecentBooks);
router.get('/books/:id', getBookById);
router.post('/books/review/:bookId', verifyAccessToken, addReview);
router.put(
  "/:bookId/image",
  verifyAccessToken,      // 🔒 Optional: only allow logged-in users
  isAdmin,        // 🔒 Optional: only allow admin
  upload.single("coverImage"), // ⬆️ Accept single file named 'coverImage'
  imageUpdate
);

export default router;
