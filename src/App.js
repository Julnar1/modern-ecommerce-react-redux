import { Routes,Route,Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import ProductList from './components/products/ProductList';
import ProductDetails from './components/products/ProductDetails';
import AboutUs from './components/about/About';
import ContactUs from './components/contact/Contact';
import ShoppingCart from './components/cart/Cart';
import PlaceOrder from './components/order/PlaceOrder';
import OrderConfirmationPage from './components/order/OrderConfirmation';
import NotFound from './components/NotFound';
import Footer from './components/footer/Footer';
import LoginPage from './components/login/loginPage';
import ForgotPassword from './components/login/ForgotPassword';
import Profile from './components/profile/Profile';
import './App.css';
import { useEffect } from 'react';
import { fetchProducts } from './redux/features/productSlice';
import { useDispatch,useSelector } from 'react-redux';
import { selectIsAuthenticated } from './redux/features/authSlice';

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.product.status); 
  const isAuthenticated = useSelector(selectIsAuthenticated);
  useEffect(() => {
    if (status === 'idle') {
        dispatch(fetchProducts());
    }
}, [dispatch, status]);
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
  }
  return children;
};
  return (
    <div className="App  d-flex flex-column bg-body-tertiary">
       <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/" element={
            <Home />
          }></Route>
        <Route path="/products" element={
             <ProductList/>
          }></Route>
        <Route path="/products/category/:categorySlug" element={
             <ProductList />
          } />
        <Route path="/products/:prodId" element={
             <ProductDetails/>
          }></Route>
        <Route path="/about" element={
             <AboutUs/>
          }></Route>
        <Route path="/contact" element={
             <ContactUs/>
          }></Route>
        <Route path="/cart" element={
             <ShoppingCart/>
          }></Route>
        <Route path="/place-order" element={
          <ProtectedRoute>
             <PlaceOrder />
          </ProtectedRoute>

          } />
        <Route path="/order-confirmation" element={
          <ProtectedRoute>
             <OrderConfirmationPage />
          </ProtectedRoute>
          } />
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
     <Footer />
    </div>
  );
}

export default App;
