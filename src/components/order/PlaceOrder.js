import React from "react";
import "./OrderPages.css";
import { useSelector, useDispatch } from "react-redux";
import OrderProgress from "../order/OrderProgress";
import OrderSummary from "../order/OrderSummary";
import OrderItems from "../order/OrderItems";
import ShippingAddress from "../order/ShippingAddress";
import PaymentMethod from "../order/PaymentMethod";
import {
  setOrderId,
  setOrderStatus,
  setShippingStatus,
  setPaymentStatus,
} from "../../redux/features/orderSlice";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

function PlaceOrder() {
  // Hardcoded shipping and payment information
  const shippingAddress = {
    name: "Julnar Nabeel",
    address: "Khaitham Building, Hessa Street, 1234, United Arab Emirates",
  };
  const paymentMethod = "Cash on Delivery";

  // Access cart items and totals from Redux
  const orderItems = useSelector((state) => state.cart.selectedProducts);
  const subTotal = useSelector((state) => state.cart.subTotal);
  const tax = useSelector((state) => state.cart.tax);
  const shippingCost = useSelector((state) => state.cart.shippingCost);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrderClick = () => {
    // Generate a dummy order ID (replace with API call later)
    const newOrderId = Math.random().toString(36).substring(2, 15);

    // Dispatch actions to update Redux state
    dispatch(setOrderId(newOrderId));
    dispatch(setOrderStatus("processing"));
    dispatch(setShippingStatus("not delivered"));
    dispatch(setPaymentStatus("not paid"));

    // Navigate to the order confirmation page
    navigate("/order-confirmation");
  };
  return (
    <div className={classNames("container", "place-order-container")}>
      <OrderProgress />
      <div className="row">
        <div className="col-md-8">
          <ShippingAddress address={shippingAddress} />
          <PaymentMethod method={paymentMethod} />
          <OrderItems orderItems={orderItems} />
        </div>
        <div className="col-md-4">
          <OrderSummary
            subTotal={subTotal}
            tax={tax}
            total={total}
            shippingCost={shippingCost}
            showButton={true}
            onPlaceOrder={handlePlaceOrderClick}
          />
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
