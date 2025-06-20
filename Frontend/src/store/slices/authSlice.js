import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/axiosInstance.js";

const initialState = {
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;

    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    localStorage.removeItem("accessToken");
  } catch (err) {
    console.error("Logout error:", err);
  }
});

// Get current user profile
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/auth/me");
      // console.log(res);

      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.put("/auth/me", formData,
         {
           withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.user; // expected by reducer
    } catch (err) {
      // Add this log to see real response
      console.error("Update Profile Error:", err.response?.data || err.message);
      
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message || "Failed to update profile"
      );
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;