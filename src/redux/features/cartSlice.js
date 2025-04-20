import { createSlice } from "@reduxjs/toolkit";
import { updateProductStock } from "./productSlice";

const initialState = {
  selectedProducts: [],
  subTotal: 0,
  tax: 0,
  shippingCost: 25, // Initial shipping cost
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.selectedProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        // Update quantity with the value passed from ProductDetails.js
        state.selectedProducts = state.selectedProducts.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Add new item with the quantity passed from ProductDetails.js
        state.selectedProducts = [
          ...state.selectedProducts,
          { ...action.payload },
        ];
      }
      cartSlice.caseReducers.calculateTotals(state); // Recalculate totals
    },
    increaseQuantity: (state, action) => {
      const existingProductIndex = state.selectedProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        // Check if we can increase quantity (stock limit)
        const currentItem = state.selectedProducts[existingProductIndex];
        const newQuantity = currentItem.quantity + 1;
        
        // Only increase if we have enough stock
        if (newQuantity <= currentItem.stock) {
          state.selectedProducts = state.selectedProducts.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: newQuantity }
              : item
          );
        }
      }
      cartSlice.caseReducers.calculateTotals(state); // Recalculate totals
    },
    decreaseQuantity: (state, action) => {
      const existingProductIndex = state.selectedProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        if (state.selectedProducts[existingProductIndex].quantity > 1) {
          state.selectedProducts = state.selectedProducts.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          // Remove the item if quantity is 1
          state.selectedProducts = state.selectedProducts.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
      cartSlice.caseReducers.calculateTotals(state); // Recalculate totals
    },
    removeFromCart: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (item) => item.id !== action.payload.id
      );
      cartSlice.caseReducers.calculateTotals(state); // Recalculate totals
    },
    calculateTotals: (state) => {
      // Calculate subtotal
      state.subTotal = state.selectedProducts.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );

      // Calculate tax (15% of subtotal)
      state.tax = state.subTotal * 0.125;

      // Calculate shipping cost (conditional)
      state.shippingCost = state.subTotal > 100 ? 0 : 25;

      // Calculate total
      state.total = state.subTotal + state.tax + state.shippingCost;
    },
    clearCart: (state) => {
      state.selectedProducts = [];
      state.subTotal = 0;
      state.tax = 0;
      state.shippingCost = 25;
      state.total = 0;
    },
  },
});

// Create a thunk for placing an order that updates stock
export const placeOrder = (dispatch) => {
  return (getState) => {
    const state = getState();
    const cartItems = state.cart.selectedProducts;
    
    // Update stock for each product in the cart
    cartItems.forEach(item => {
      dispatch(updateProductStock({ 
        productId: item.id, 
        quantity: item.quantity 
      }));
    });
    
    // Clear the cart after order is placed
    dispatch(cartSlice.actions.clearCart());
  };
};

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
