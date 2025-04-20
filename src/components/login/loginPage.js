import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faLock, 
  faSpinner, 
  faExclamationCircle 
} from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../redux/features/authSlice";
import "./loginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  
  // Get the redirect path from location state, default to profile page
  const from = location.state?.from?.pathname || "/profile";
  
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setError(null);
    
    try {
      const resultAction = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(resultAction)) {
        // Redirect to the page the user was trying to access
        navigate(from);
      } else if (loginUser.rejected.match(resultAction)) {
        setError(resultAction.payload || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p className="text-muted">Please login to your account</p>
        </div>
        
        {error && (
          <div className="alert alert-danger">
            <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Username
            </label>
            <input
              type="text"
              name="username"
              className={`form-control ${formErrors.username ? "is-invalid" : ""}`}
              value={formData.username}
              placeholder="Example: emilys"
              onChange={handleChange}
              disabled={authStatus === "loading"}
            />
            {formErrors.username && (
              <div className="invalid-feedback">{formErrors.username}</div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              <FontAwesomeIcon icon={faLock} className="me-2" />
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
              value={formData.password}
              placeholder="Example: emilyspass"
              onChange={handleChange}
              disabled={authStatus === "loading"}
            />
            {formErrors.password && (
              <div className="invalid-feedback">{formErrors.password}</div>
            )}
          </div>
          
          <div className="form-group">
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-100 login-button"
            disabled={authStatus === "loading"}
          >
            {authStatus === "loading" ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
