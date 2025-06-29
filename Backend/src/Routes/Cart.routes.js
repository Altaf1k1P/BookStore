import { Router } from "express";
import {verifyAccessToken} from "../middleware/verifyAccessToken.js"
import { AddToCart, GetCartItem, RemoveBookFromCart } from "../Controller/Cart.Controller.js";

const router = Router();

router.post("/Cart", verifyAccessToken, AddToCart);
router.get("/Cart/:bookId", verifyAccessToken, GetCartItem);
router.delete("/Cart/:bookId", verifyAccessToken, RemoveBookFromCart);

export default router;