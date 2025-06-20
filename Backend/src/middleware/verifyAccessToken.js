import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { ApiError } from '../Utils/ApiError.js';
import { asyncHandler } from '../Utils/asyncHandler.js';

export const verifyAccessToken = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Access token missing or invalid");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = user; // attach user to request for future use
    next();
  } catch (err) {
    throw new ApiError(401, "Token is expired or invalid");
  }
});
