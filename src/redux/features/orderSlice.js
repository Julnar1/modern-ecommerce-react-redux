import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderId: null,
  orderStatus: "pending",
  shippingStatus: "",
  paymentStatus: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
    setShippingStatus: (state, action) => {
      state.shippingStatus = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
  },
});
export const {
  setOrderId,
  setOrderStatus,
  setShippingStatus,
  setPaymentStatus,
} = orderSlice.actions;

export default orderSlice.reducer;
