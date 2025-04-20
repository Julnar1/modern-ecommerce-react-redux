import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PRODUCTS_API } from "../../constants";
import { fetchApi } from "../../utils/api";

const initialState = {
  products: [],
  searchText: "",
  filteredProductsList: [],
  status: "idle",
  error: null,
  selectedProduct: null,
  categories: [],
};

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchApi(PRODUCTS_API);
      return data.products; // Extract the 'products' array
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching a single product by ID
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await fetchApi(`${PRODUCTS_API}/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching products by search text
export const fetchProductsBySearchText = createAsyncThunk(
  "product/fetchProductsBySearchText",
  async (searchText, { getState, rejectWithValue }) => {
    try {
      const state = getState().product;
      const allProducts = state.products; // Get all products from the state

      if (!searchText || searchText.trim() === "") {
        return allProducts; // Return all products if search text is empty
      }

      // Filter products on the client side
      const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );

      return filteredProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add a new thunk for updating product stock
export const updateProductStock = createAsyncThunk(
  "products/updateStock",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      // In a real application, you would make an API call here
      // For now, we'll just return the data to update locally
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch products";
      })
      // Add similar cases for fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Assuming you want to store the single product separately
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch product";
      })
      .addCase(fetchProductsBySearchText.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsBySearchText.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredProductsList = action.payload; // Update filteredProductsList
      })
      .addCase(fetchProductsBySearchText.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to search products";
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        
        // Update stock in the products list
        const productIndex = state.products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
          state.products[productIndex].stock -= quantity;
        }
        
        // Update stock in the selected product if it's the same product
        if (state.selectedProduct && state.selectedProduct.id === productId) {
          state.selectedProduct.stock -= quantity;
        }
      });
  },
});

export const { setSearchText } = productSlice.actions;
export const selectProducts = (state) => state.product.products;
export const selectProductById = (state, productId) => 
  state.product.products.find(product => product.id === parseInt(productId));
export default productSlice.reducer;
