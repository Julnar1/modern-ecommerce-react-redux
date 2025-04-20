import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import StarRating from "../common/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "../../redux/features/cartSlice";
import { COLORS } from '../../constants';

function Offers({ productsData }) {
  const dispatch = useDispatch();
  // Use productsData prop if provided, otherwise use products from Redux store
  const reduxProducts = useSelector((state) => state.product.products);
  const products = productsData || reduxProducts;
  const saleProducts = products.filter((product) => product.discountPercentage > 0);
  
  // State to control how many products to show
  const [showAll, setShowAll] = useState(false);
  
  // Determine how many products to display
  const displayedProducts = showAll ? saleProducts : saleProducts.slice(0, 4);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="container mt-4 mb-2">
      <h2 className="mb-3">Special Offers</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {displayedProducts.map((product) => (
          <div key={product.id} className="col">
            <div className="card h-100">
              <div className="position-relative">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    className="card-img-top object-fit-contain"
                    alt={product.title}
                    style={{ height: "200px" }}
                  />
                </Link>
                <div className="position-absolute top-0 end-0 m-2">
                  <span className="badge bg-danger">
                    {product.discountPercentage}% OFF
                  </span>
                </div>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-reset text-decoration-none"
                  >
                    {product.title}
                  </Link>
                </h5>
                
                {/* Star Rating - Centered */}
                <div className="mb-2 d-flex justify-content-center align-items-center">
                  <StarRating 
                    rating={product.rating || 0} 
                    size="sm" 
                    showRating={true} 
                  />
                </div>
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-center align-items-center mb-2">
                    <span className="text-decoration-line-through text-muted me-2">
                      AED {product.price}
                    </span>
                    <span className="fs-5 fw-bold" style={{ color: COLORS.PRIMARY }}>
                      AED {(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                  </div>
                  
                  <button
                    className="btn w-100"
                    style={{ 
                      backgroundColor: COLORS.PRIMARY,
                      color: 'white'
                    }}
                    onClick={() => handleAddToCart(product)}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Show More/Less Button */}
      {saleProducts.length > 4 && (
        <div className="text-center mt-4">
          <button 
            className="btn"
            style={{ 
              backgroundColor: COLORS.PRIMARY, 
              color: 'white',
              border: 'none'
            }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Offers;
