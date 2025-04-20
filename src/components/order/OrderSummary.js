import React from "react";
import "./OrderPages.css";

function OrderSummary({
  subTotal,
  tax,
  total,
  shippingCost,
  showButton = false,
  onPlaceOrder,
}) {
  if (subTotal === undefined || tax === undefined || total === undefined) {
    return <div>Loading Order Summary...</div>; // Or return null
  }
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <p>
        <span className="fw-bold">Subtotal:</span> ${subTotal.toFixed(2)}
      </p>
      <p>
        <span className="fw-bold">Tax: </span>${tax.toFixed(2)}
      </p>
      <p>
        <span className="fw-bold">Shipping:</span> ${shippingCost.toFixed(2)}
      </p>
      <p>
        <span className="fw-bold">Total:</span> ${total.toFixed(2)}
      </p>
      {showButton && (
        <button className="place-order-button mx-auto" onClick={onPlaceOrder}>
          PLACE ORDER
        </button>
      )}
    </div>
  );
}

export default OrderSummary;
