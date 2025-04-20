import CartItem from './CartItem';
import styles from '../../styles/Cart.module.css';
import {  useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/features/authSlice';

function ShoppingCart() {
  //const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  const selectedProducts = useSelector((state) => state.cart.selectedProducts);
//console.log("Selected Products in Cart page:",selectedProducts);
const subTotal = useSelector((state) => state.cart.subTotal);
// Calculate total quantity of items
const totalQuantity = selectedProducts.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const handleProceedCheckout = () => {
    if (isAuthenticated) {
      navigate('/place-order');
    } else {
      navigate('/login', { state: { from: { pathname: '/place-order' } } });
    }
  };
  return (
      <div className="container">
      <h2>My Cart</h2>
      {selectedProducts?.length === 0 ? (
          <p>Your cart is empty.</p>
      ) : (
        <div className="row">
        <div className="col-md-9">
        <ul>
        <hr/>
          {selectedProducts?.map((cartItem) =>{
 return <CartItem key={cartItem.id} cartItem={cartItem}/>;
})}
        </ul>
        </div>
        <div className="col-md-3">
        <div className="card">
        <div className={styles.cartTotals}>
    <div className={classNames("fw-normal fs-4",styles.subtotal)}>
        <span>Subtotal ({totalQuantity} items):</span>
        <span className={styles.subtotalAamount}>AED {subTotal.toFixed(2)}</span>
    </div>
    <div className={styles.checkoutBtnContainer}>
    <button onClick={handleProceedCheckout} className={styles.checkoutBtn}>Checkout</button>
</div>
      </div>      
          </div>
        </div>
        </div>
      )}
    </div>

      );
}

export default ShoppingCart;
