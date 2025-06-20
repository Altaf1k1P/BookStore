import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Upload local file to Cloudinary
export const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "book_covers",
      resource_type: "image",
      transformation: [
        { width: 800, crop: "scale" },
        { quality: "auto:good" }
      ],
    });

    fs.unlinkSync(localFilePath); // ✅ Delete temp file
    return { url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("Cloudinary Upload Error:", error.message);
    return null;
  }
};

// ✅ Delete image by public_id
export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error.message);
  }
};
