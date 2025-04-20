import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

const StarRating = ({ rating, maxRating = 5, size = 'sm', showRating = false }) => {
  // Convert rating to a number and ensure it's between 0 and maxRating
  const numericRating = Math.min(Math.max(Number(rating) || 0, 0), maxRating);
  
  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
  
  // Determine icon size class
  const sizeClass = {
    'xs': 'fa-xs',
    'sm': 'fa-sm',
    'md': 'fa-md',
    'lg': 'fa-lg',
    'xl': 'fa-xl'
  }[size] || 'fa-sm';
  
  return (
    <div className="d-flex align-items-center">
      <div className="star-rating">
        {/* Render full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon 
            key={`full-${index}`} 
            icon={faStar} 
            className={`text-warning ${sizeClass}`} 
          />
        ))}
        
        {/* Render half star if needed */}
        {hasHalfStar && (
          <FontAwesomeIcon 
            key="half" 
            icon={faStarHalfAlt} 
            className={`text-warning ${sizeClass}`} 
          />
        )}
        
        {/* Render empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesomeIcon 
            key={`empty-${index}`} 
            icon={faStarRegular} 
            className={`text-warning ${sizeClass}`} 
          />
        ))}
      </div>
      
      {/* Show numeric rating if requested */}
      {showRating && (
        <span className="ms-2 text-warning fw-bold">
          {numericRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  maxRating: PropTypes.number,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  showRating: PropTypes.bool
};

export default StarRating; 