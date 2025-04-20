import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../constants';

const LoadingSpinner = ({ 
  size = 'md', 
  color = COLORS.PRIMARY, 
  text = 'Loading...', 
  fullScreen = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };

  const spinnerClass = `spinner-border ${sizeClasses[size]} ${className}`;
  
  if (fullScreen) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" 
           style={{ 
             minHeight: '100vh',
             backgroundColor: 'rgba(255, 255, 255, 0.8)',
             position: 'fixed',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             zIndex: 9999
           }}>
        <div className={spinnerClass} style={{ color }} role="status">
          <span className="visually-hidden">{text}</span>
        </div>
        {text && <p className="mt-2">{text}</p>}
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className={spinnerClass} style={{ color }} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      {text && <p className="ms-2 mb-0">{text}</p>}
    </div>
  );
};

export default LoadingSpinner; 