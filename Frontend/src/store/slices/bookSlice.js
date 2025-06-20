import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helper/axiosInstance.js";

const initialState = {
  books: [],
  recentBooks: [],
  singleBook: null,
  total: 0,
  page: 1,
  loading: false,
  error: null,
  // Specific addBook state
  addBookStatus: 'idle',
  addBookError: null
};

export const fetchAllBooks = createAsyncThunk(
  "books/fetchAll",
  async ({ search = "", page = 1, limit = 10, sort = "desc" }, thunkAPI) => {
    try {
      const res = await axios.get(`/books?search=${search}&page=${page}&limit=${limit}&sort=${sort}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchRecentBooks = createAsyncThunk("books/fetchRecent", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/books/recent");
    return res.data.books;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const fetchSingleBook = createAsyncThunk("books/fetchSingle", async (id, thunkAPI) => {
  try {
    const res = await axios.get(`/books/${id}`);
    return res.data.book;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const submitReview = createAsyncThunk(
  "books/submitReview",
  async ({ id, rating, comment }, thunkAPI) => {
    try {
      const res = await axios.post(`/books/review/${id}`, { rating, comment });
      console.log('review', res);
      return res.data.book;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to submit review");
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post("/book-add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.book;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add book");
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecentBooks.fulfilled, (state, action) => {
        state.recentBooks = action.payload;
      })
      .addCase(fetchSingleBook.fulfilled, (state, action) => {
        state.singleBook = action.payload;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.singleBook = action.payload; // Refresh book with new review
      })
      .addCase(addBook.pending, (state) => {
        state.addBookStatus = 'loading';
        state.addBookError = null;
      })
      .addCase(addBook.fulfilled, (state) => {
        state.addBookStatus = 'succeeded';
      })
      .addCase(addBook.rejected, (state, action) => {
        state.addBookStatus = 'failed';
        state.addBookError = action.payload || 'Failed to add book';
      });
  },
});

export default bookSlice.reducer;
