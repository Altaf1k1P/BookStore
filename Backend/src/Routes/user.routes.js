import express from 'express';
import { register, login, logout, refreshAccessToken, deleteAdmin, getProfile, updateProfile  } from '../Controller/auth.Controller.js';
import { verifyAccessToken } from '../middleware/verifyAccessToken.js';
import { isAdmin } from '../middleware/middleware.isAdmin.js';
import { upload } from '../middleware/multer.middleware.js';



const router = express.Router();


router.post('/signup', register);
router.post('/login', login);
// 🔒 Protected route
router.post('/logout', verifyAccessToken, logout);
router.post("/refresh-token", refreshAccessToken);
router.get("/admin-dashboard", verifyAccessToken, isAdmin, (req, res) => {
  res.send("Welcome to the Admin Dashboard!");
});
router.delete("/admin/delete", verifyAccessToken, isAdmin, deleteAdmin);
router.get('/me', verifyAccessToken, getProfile);
router.put('/me', verifyAccessToken, upload.single('avatar'), updateProfile);
export default router;
