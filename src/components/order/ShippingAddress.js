import React from "react";
import "./OrderPages.css";

function ShippingAddress({ address, showStatus = false, status }) {
  return (
    <div className="shipping-address">
      <h3>Shipping Address</h3>
      <p>
        {address.name}, {address.address}{" "}
        {showStatus && <div className="status">Status:{status}</div>}
      </p>
    </div>
  );
}

export default ShippingAddress;
