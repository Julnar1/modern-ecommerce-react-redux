import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CATEGORIES_API } from "../../constants";
import { fetchApi } from "../../utils/api";

const initialState = {
  categories: [],
  selectedCategory: null,
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchApi(CATEGORIES_API);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      // Add reducer to set selected category
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch categories";
      });
  },
});
export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
export const selectCategories = (state) => state.category.categories;
export const selectSelectedCategory = (state) =>
  state.category.selectedCategory;
export const selectCategoryStatus = (state) => state.category.status;
export const selectCategoryError = (state) => state.category.error;
