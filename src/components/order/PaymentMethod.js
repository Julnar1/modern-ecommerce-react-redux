import React from "react";
import "./OrderPages.css";

function PaymentMethod({ method, showStatus = false, status }) {
  return (
    <div className="payment-method">
      <h3>Payment Method</h3>
      <p>
        {method} {showStatus && <div className="status">Status:{status}</div>}
      </p>
    </div>
  );
}

export default PaymentMethod;
