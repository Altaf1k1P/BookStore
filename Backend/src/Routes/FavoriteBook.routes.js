import {Router} from 'express';
import { verifyAccessToken } from '../Utils/token.utils.js';
import { AddFavoriteBook, RemoveFavoriteBook, GetFavoriteBook} from '../Controller/FavoriteBook.Controller.js';

const router = Router();

router.post("/favorites/:bookId", verifyAccessToken, AddFavoriteBook);
router.get("/api/favorites", verifyAccessToken, GetFavoriteBook)
router.delete("/favorites/:bookId", verifyAccessToken, RemoveFavoriteBook);

export default router;