import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";
import categoryReducer from "./features/categorySlice";
import orderReducer from "./features/orderSlice";
import authReducer from "./features/authSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    category: categoryReducer,
    order: orderReducer,
    auth: authReducer,
  },
});

export default store;
