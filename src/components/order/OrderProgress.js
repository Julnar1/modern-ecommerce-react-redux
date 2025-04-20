import React from "react";
import "./OrderPages.css";

function OrderProgress() {
  const steps = [
    { id: 1, label: "Login" },
    { id: 2, label: "Shipping Address" },
    { id: 3, label: "Payment Method" },
    { id: 4, label: "Place Order" },
  ];
  return (
    <div className="order-progress">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="step">
            <div
              className={`step-circle ${step.id < 4 ? "completed" : "current"}`}
            >
              {step.id < 4 ? "✓" : step.id}
            </div>
            <div className="step-label">{step.label}</div>
          </div>
          {index < steps.length - 1 && <div className="step-line"></div>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default OrderProgress;
