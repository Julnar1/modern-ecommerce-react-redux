import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../constants';

const ErrorMessage = ({ 
  message, 
  title = 'Error', 
  type = 'danger',
  className = '',
  showIcon = true
}) => {
  const alertClass = `alert alert-${type} ${className}`;
  
  return (
    <div className={alertClass} role="alert">
      {showIcon && (
        <FontAwesomeIcon 
          icon={faExclamationCircle} 
          className="me-2" 
          style={{ color: type === 'danger' ? COLORS.DANGER : COLORS.WARNING }} 
        />
      )}
      {title && <strong>{title}: </strong>}
      {message}
    </div>
  );
};

export default ErrorMessage; 