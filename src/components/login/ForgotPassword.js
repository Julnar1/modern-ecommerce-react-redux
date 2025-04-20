import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faSpinner, 
  faExclamationCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import "./loginPage.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    const errors = {};
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    // Simulate API call for password reset
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Reset Password</h2>
          <p className="text-muted">Enter your email to receive reset instructions</p>
        </div>
        
        {isSuccess ? (
          <div className="alert alert-success">
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Password reset instructions have been sent to your email.
            <div className="mt-3">
              <Link to="/login" className="btn btn-outline-primary">
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="alert alert-danger">
                <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">
                  <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <div className="invalid-feedback">{formErrors.email}</div>
                )}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Instructions"
                )}
              </button>
              
              <div className="text-center">
                <Link to="/login" className="forgot-password-link">
                  Back to Login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword; 