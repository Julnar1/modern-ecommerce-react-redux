import React from "react";
import "./OrderPages.css";
import { useSelector } from "react-redux";
import OrderSummary from "./OrderSummary";
import OrderItems from "./OrderItems";
import ShippingAddress from "./ShippingAddress";
import PaymentMethod from "./PaymentMethod";
import classNames from "classnames";

function OrderConfirmationPage() {
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
  const orderId = useSelector((state) => state.order.orderId);
  const shippingStatus = useSelector((state) => state.order.shippingStatus);
  const paymentStatus = useSelector((state) => state.order.paymentStatus);
  return (
    <div className={classNames("container", "order-confirmation-container")}>
      <h2>Order {orderId}</h2>
      <div className="row">
        <div className="col-md-8">
          <ShippingAddress
            address={shippingAddress}
            showStatus={true}
            status={shippingStatus}
          />
          <PaymentMethod
            method={paymentMethod}
            showStatus={true}
            status={paymentStatus}
          />
          <OrderItems orderItems={orderItems} />
        </div>
        <div className="col-md-4">
          <OrderSummary
            subTotal={subTotal}
            tax={tax}
            shippingCost={shippingCost}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
