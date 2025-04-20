import  "./ProductDetails.css";
import classNames from "classnames";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { fetchProductById, updateProductStock, selectProductById, fetchProductComments, addComment } from "../../redux/features/productSlice";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../redux/features/authSlice";
import StarRating from "../common/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faShoppingCart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./ProductDetails.css";
import { COLORS } from '../../constants';

function ProductDetails() {
  const { prodId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const product = useSelector((state) => selectProductById(state, prodId));
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  
  // Get cart items to check if product is already in cart
  const cartItems = useSelector((state) => state.cart.selectedProducts);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(null);

  useEffect(() => {
    dispatch(fetchProductById(prodId));
    fetchComments();
  }, [dispatch, prodId]);

  // Initialize quantity from cart if product is already in cart
  useEffect(() => {
    if (product && cartItems.length > 0) {
      const cartItem = cartItems.find(item => item.id === product.id);
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
    }
  }, [product, cartItems]);

  const fetchComments = async () => {
    setCommentsLoading(true);
    setCommentsError(null);
    try {
      const response = await fetch(`https://dummyjson.com/comments/post/${prodId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.status}`);
      }
      const data = await response.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setCommentsError(err.message);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= product.stock) {
      // Pass the product with the selected quantity
      dispatch(addToCart({ ...product, quantity }));
      
      // Update stock
      dispatch(updateProductStock({ 
        productId: product.id, 
        quantity: quantity 
      }));
      
      // Navigate to cart
      navigate("/cart");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() && isAuthenticated) {
      try {
        const response = await fetch("https://dummyjson.com/comments/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            body: newComment,
            postId: parseInt(prodId),
            userId: user.id
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add comment: ${response.status}`);
        }

        const newCommentData = await response.json();
        // Manually add the user object with username
        newCommentData.user = { username: user.username };
        setComments([...comments, newCommentData]);
        setNewComment("");
      } catch (err) {
        console.error("Error submitting comment:", err);
        setCommentsError(err.message);
      }
    }
  };

  const handleBack = () => {
    // Check if we came from the login page
    const fromLogin = location.state?.from?.pathname === '/login';
    if (fromLogin) {
      // If we came from login, go back to the previous page before login
      navigate(-2);
    } else {
      // Otherwise, just go back one step
      navigate(-1);
    }
  };

  if (status === "loading") {
    return <div className="container mt-5 text-center">
      <div className="spinner-border" style={{ color: 'orange' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  if (status === "failed") {
    return <div className="container mt-5 alert alert-danger">Error: {error}</div>;
  }

  if (!product) return <div className="container mt-4">Product not found</div>;

  const discountPercentage = product.discountPercentage || 0;
  const discountedPrice = product.price * (1 - discountPercentage / 100);

  return (
    <div className="container mt-4 product-details-page">
      <button 
        className="btn btn-outline-secondary mb-3" 
        onClick={handleBack}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Back
      </button>
      
      <div className="row">
        <div className="col-md-6">
          <div className="product-image-container">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="product-image"
            />
          </div>
          <div className="d-flex overflow-auto mb-3 thumbnail-container">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} - ${index + 1}`}
                className="me-2 thumbnail"
                style={{
                  border: selectedImage === index ? "2px solid orange" : "1px solid #dee2e6",
                }}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-info-container">
            <h1 className="product-title">{product.title}</h1>
            
            <div className="product-brand mb-3">{product.brand}</div>
            
            {/* Star Rating */}
            <div className="rating-container mb-3 d-flex flex-column align-items-center">
              <StarRating rating={product.rating} size="lg" showRating={true} />
            </div>
            
            <div className="price-container">
              <h4 className="current-price">AED {discountedPrice.toFixed(2)}</h4>
              {discountPercentage > 0 && (
                <>
                  <span className="original-price">
                    AED {product.price.toFixed(2)}
                  </span>
                  <span className="discount-badge ms-2">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
            
            <div className="stock-container">
              <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock > 0 ? `In Stock: ${product.stock} units` : 'Out of Stock'}
              </span>
            </div>
            
            <div className="quantity-container d-flex flex-column align-items-center">
              <label htmlFor="quantity" className="form-label mb-2">Quantity:</label>
              <div className="input-group quantity-controls">
                <button
                  className="btn"
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={product.stock}
                />
                <button
                  className="btn"
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            
            <button
              className="btn btn-primary btn-lg mb-4 w-100"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" /> Add to Cart
            </button>
            
            <div className="product-description">
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>
            
            <div className="product-details">
              <h4>Product Details</h4>
              <ul className="list-unstyled">
                <li><strong>Brand:</strong> {product.brand}</li>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Stock:</strong> {product.stock} units</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="reviews-section mt-5">
        <h3 className="reviews-title">Customer Reviews</h3>
        {commentsLoading ? (
          <div className="text-center">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : commentsError ? (
          <div className="alert alert-danger">{commentsError}</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="review-card">
              <div className="review-header">
                <div className="review-author">{comment.user && comment.user.username ? comment.user.username : "User"}</div>
                <div className="review-date">
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </div>
              </div>
              <div className="review-body">{comment.body}</div>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
        )}
        
        <div className="add-review-section mt-4">
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">Your Review</label>
                <textarea
                  id="comment"
                  className="form-control"
                  rows="3"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
          ) : (
            <p className="login-prompt">
              Please{" "}
              <Link
                to="/login"
                className="login-link"
                state={{ from: { pathname: `/products/${prodId}` } }}
              >
                login
              </Link>{" "}
              to write a review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
