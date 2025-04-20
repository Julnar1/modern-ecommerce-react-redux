import React from 'react';
import './PlaceOrder.css';
import { useSelector } from 'react-redux'; // Import useSelector
import classNames from 'classnames';
function PlaceOrder() {
    const steps = [
        { id: 1, label: 'Login' },
        { id: 2, label: 'Shipping Address' },
        { id: 3, label: 'Payment Method' },
        { id: 4, label: 'Place Order' },
    ];
    // Hardcoded shipping information
    const shippingAddress = {
        name: 'Julnar Nabeel',
        address: 'Al Khayyal Building , gt , 1234 , United Arab Emirates',
    };

    // Hardcoded payment method
    const paymentMethod = 'Cash';

    // Access cart items from Redux
    const orderItems = useSelector((state) => state.cart.selectedProducts);

    // Calculate order summary
    const itemsTotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = itemsTotal * 0.15; // 15% tax
    const shipping = itemsTotal>100?0:15;
    const total = itemsTotal + tax + shipping;

    return (
        <div className={classNames("container","place-order-container")}>
            <div className="order-progress">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className="step">
                        <div className={`step-circle ${step.id < 4 ? 'completed' : 'current'}`}>
                            {step.id < 4 ? '✓' : step.id}
                        </div>
                        <div className="step-label">{step.label}</div>
                    </div>
                    {index < steps.length - 1 && <div className="step-line"></div>}
                </React.Fragment>
            ))}
        </div>
            <div className="row">
                <div className="col-md-8">
                <h1>Place Order</h1>

<div className="shipping-address">
    <h3>Shipping Address</h3>
    <p>{shippingAddress.name}, {shippingAddress.address}</p>
</div>

<div className="payment-method">
    <h3>Payment Method</h3>
    <p>{paymentMethod}</p>
</div>

<div className="order-items mb-2">
    <h3>Order Items</h3>
    <table>
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {orderItems.map((item, index) => (
                <tr key={index}>
                    <td><img src={item.thumbnail} alt={item.title} className="order-item-image" /></td>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
                </div>
                <div className="col-md-4">
                <div className="order-summary">
                <h3>Order Summary</h3>
                <p><span className="fw-bold">Subtotal:</span> ${itemsTotal.toFixed(2)}</p>
                <p><span className="fw-bold">Tax: </span>${tax.toFixed(2)}</p>
                <p><span className="fw-bold">Shipping:</span> ${shipping}</p>
                <p><span className="fw-bold">Total:</span> ${total.toFixed(2)}</p>
                <button className="place-order-button mx-auto">PLACE ORDER</button>
            </div>
                </div>
            </div>  
        </div>
    );
}

export default PlaceOrder;