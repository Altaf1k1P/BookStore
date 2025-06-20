import jwt from 'jsonwebtoken';
import { ApiError } from './ApiError.js';

/**
 * Generate an access token
 * @param {Object} payload - Data to embed in token (e.g., { _id, username })
 * @returns {string} - Signed JWT
 */
export const generateAccessToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    });
  } catch (err) {
    throw new ApiError(500, 'Failed to generate access token');
  }
};

/**
 * Generate a refresh token
 * @param {Object} payload - Data to embed in token (e.g., { _id })
 * @returns {string} - Signed refresh token
 */
export const generateRefreshToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    });
  } catch (err) {
    throw new ApiError(500, 'Failed to generate refresh token');
  }
};

/**
 * Verify access token
 * @param {string} token
 * @returns {Object} - Decoded payload
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, 'Access token is invalid or expired');
  }
};

/**
 * Verify refresh token
 * @param {string} token
 * @returns {Object} - Decoded payload
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, 'Refresh token is invalid or expired');
  }
};
