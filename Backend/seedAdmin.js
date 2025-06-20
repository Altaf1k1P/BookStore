import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { User } from "./src/models/User.js";
import connectDB from "./src/db/index.js";

const {
  ADMIN_EMAIL,
  ADMIN_USERNAME,
  ADMIN_PASSWORD
} = process.env;

const createAdmin = async () => {
  try {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_USERNAME) {
      throw new Error("ADMIN credentials not found in .env");
    }

    await connectDB(); // ✅ consistent DB connection

    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
      console.log("✅ Admin already exists:", existingAdmin.email);
    } else {
      const admin = new User({
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
      });

      await admin.save(); // ✅ ensures password is hashed

      console.log("🎉 Admin created:", admin.email);
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
