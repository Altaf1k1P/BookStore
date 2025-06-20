import { User } from "../models/User.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../Utils/token.utils.js";
import jwt from "jsonwebtoken"; 
import { uploadOnCloudinary, deleteFromCloudinary } from "../Utils/cloudinary.js";
import fs from 'fs';

// Regex for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ✅ User Registration
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required.");
  }

  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format.");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters.");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, "User with same username or email already exists.");
  }

  const user = await User.create({ username, email, password });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      userId: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

// ✅ User Login
const login = asyncHandler(async (req, res) => {
  // console.log(req.body);
  
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Username and password are required.");
  }

  const user = await User.findOne({ username });
  // console.log(user);
  

  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, "Invalid username or password.");
  }

  const payload = { _id: user._id, username: user.username, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken({ _id: user._id });

  // Save refresh token to user doc (optional but good practice)
  user.refreshToken = refreshToken;
  await user.save();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      success: true,
      message: "Login successful",
      user: {
        userId: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
});

// ✅ User Logout
const logout = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Not authenticated");
  }

  await User.findByIdAndUpdate(userId, { refreshToken: "" });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      success: true,
      message: "User logged out successfully",
    });
});

// ✅ Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const newAccessToken = generateAccessToken({
      _id: user._id,
      username: user.username,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    throw new ApiError(401, "Token expired or invalid");
  }
});

// ✅ Delete Admin
const deleteAdmin = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Admin email is required");
  }

  const admin = await User.findOne({ email, role: "admin" });

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  await User.findByIdAndDelete(admin._id);

  res.status(200).json({
    success: true,
    message: `Admin with email ${email} has been deleted.`,
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password -refreshToken');

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    user,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  console.log("req.body:", req.body);
console.log("req.file:", req.file);
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, "User not found");

  const { username, email } = req.body;

  if (username) user.username = username;
  if (email) user.email = email;

  // ✅ Handle avatar upload
  if (req.file) {
    // ✅ Optional: Delete old avatar from Cloudinary
    if (user.avatar?.public_id) {
      await deleteFromCloudinary(user.avatar.public_id);
    }

    const cloudRes = await uploadOnCloudinary(req.file.path);
    if (!cloudRes) throw new ApiError(500, "Avatar upload failed");

    user.avatar = {
      url: cloudRes.url,
      public_id: cloudRes.public_id
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export { register, login, logout, refreshAccessToken, deleteAdmin, getProfile, updateProfile };
