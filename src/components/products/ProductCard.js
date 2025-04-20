import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from '../../redux/features/cartSlice';
import StarRating from '../common/StarRating';
import { COLORS } from '../../constants';
import './ProductCard.css';

const ProductCard = React.memo(({ product, viewMode = 'grid' }) => {
  const dispatch = useDispatch();
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  }, [dispatch, product]);

  if (viewMode === 'list') {
    return (
      <div className="product-card list-view">
        <div className="row g-0">
          <div className="col-md-4">
            <Link to={`/products/${product.id}`}>
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="product-image"
              />
              {product.discountPercentage > 0 && (
                <div className="discount-badge">
                  -{Math.round(product.discountPercentage)}%
                </div>
              )}
            </Link>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Link to={`/products/${product.id}`} className="product-title">
                <h5 className="card-title">{product.title}</h5>
              </Link>
              <p className="card-text text-muted">{product.category}</p>
              
              <div className="product-rating text-center">
                <StarRating rating={product.rating} size="sm" showRating={true} />
              </div>
              
              <p className="card-text product-description">{product.description}</p>
              
              <div className="d-flex flex-column align-items-center mt-3">
                <div className="product-price mb-3 text-center">
                  <span className="original-price">${product.price.toFixed(2)}</span>
                  <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
                  {product.discountPercentage > 0 && (
                    <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
                  )}
                </div>
                <button 
                  className="btn btn-add-to-cart" 
                  onClick={handleAddToCart}
                  style={{ backgroundColor: COLORS.PRIMARY }}
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="product-image-container">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="product-image"
          />
          {product.discountPercentage > 0 && (
            <div className="discount-badge">
              -{Math.round(product.discountPercentage)}%
            </div>
          )}
        </div>
      </Link>
      <div className="card-body">
        <Link to={`/products/${product.id}`} className="product-title">
          <h5 className="card-title">{product.title}</h5>
        </Link>
        <p className="card-text text-muted">{product.category}</p>
        <div className="product-rating text-center">
          <StarRating rating={product.rating} size="sm" showRating={true} />
        </div>
        <div className="product-price text-center">
          <span className="original-price">${product.price.toFixed(2)}</span>
          <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
          )}
        </div>
        <button 
          className="btn btn-add-to-cart w-100" 
          onClick={handleAddToCart}
          style={{ backgroundColor: COLORS.PRIMARY }}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
