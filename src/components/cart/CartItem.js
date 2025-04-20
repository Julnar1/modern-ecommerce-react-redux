import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/features/cartSlice";
import { useEffect } from "react";

function CartItem(props) {
  const cartItem = props.cartItem;
  const dispatch = useDispatch();
  
  // Log when component updates to help with debugging
  useEffect(() => {
    console.log("CartItem updated:", cartItem);
  }, [cartItem]);
  
  // Calculate item total
  const itemTotal = cartItem.price * cartItem.quantity;
  
  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(cartItem));
  };
  
  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(cartItem));
  };
  
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(cartItem));
  };
  
  return (
    <div>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={cartItem.thumbnail}
            height={80}
            alt={cartItem.title}
            className="cart-item-image"
          />
          <div className="ms-3">
            <h6 className="mb-0">{cartItem.title}</h6>
            <p className="mb-0 text-start text-secondary">
              AED {cartItem.price}
              <span className="text-dark"> × {cartItem.quantity}</span>
              <span className="text-primary ms-2">= AED {itemTotal.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
          <span className="mx-2">{cartItem.quantity}</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
          <button
            className="btn btn-sm text-danger ms-3 fs-5"
            onClick={handleRemoveFromCart}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </li>
      <hr />
    </div>
  );
}

export default CartItem;
