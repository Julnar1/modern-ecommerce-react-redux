import React from 'react';
import './OrderPages.css'; 

function OrderItems({ orderItems }) {
    return (
        <div className="order-items">
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
    );
}

export default OrderItems;