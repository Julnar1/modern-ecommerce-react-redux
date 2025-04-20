import LogoImg from "../../assets/images/logo_img.png";
import classNames from "classnames";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSearch, 
  faCartShopping, 
  faUser, 
  faSignOutAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchText,
  fetchProductsBySearchText,
} from "../../redux/features/productSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";

function Header() {
  const searchText = useSelector((state) => state.product.searchText);
  const selectedProducts = useSelector((state) => state.cart.selectedProducts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    dispatch(setSearchText(event.target.value));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchProductsBySearchText(searchText));
    navigate("/products");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary-subtle">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={LogoImg} height={55} alt={"Logo"} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="d-flex flex-grow-1 mx-xl-5"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={searchText}
                  placeholder="Search for products..."
                  className="form-control"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  onChange={handleInputChange}
                />
                <div className="input-group-append">
                  <button
                    className={classNames("btn", "search-button")}
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-xl-2 me-xxl-5">
                <NavLink
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    dispatch(setSearchText(""));
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item me-xl-2 me-xxl-5">
                <NavLink to="/products" className="nav-link">
                  Products
                </NavLink>
              </li>
              <li className="nav-item me-xl-2 me-xxl-5">
                <NavLink to="/about" className="nav-link">
                  About us
                </NavLink>
              </li>
              <li className="nav-item me-xl-2 me-xxl-5">
                <NavLink to="/contact" className="nav-link">
                  Contact us
                </NavLink>
              </li>
              <li className="nav-item me-xl-2 me-xxl-5">
                <NavLink to="/cart" className="nav-link position-relative">
                  <FontAwesomeIcon icon={faCartShopping} />
                  {selectedProducts.length > 0 && (
                    <span className={classNames("badge", "badge-header")}>
                      {selectedProducts.length}
                    </span>
                  )}
                </NavLink>
              </li>
              {isAuthenticated ? (
                <>
                  <li className="nav-item me-xl-2 me-xxl-5">
                    <NavLink to="/profile" className="nav-link">
                      <FontAwesomeIcon icon={faUser} className="me-1" />
                      {user?.name || "Profile"}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button 
                      onClick={handleLogout}
                      className="nav-link btn btn-link"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink 
                    to="/login" 
                    className="nav-link"
                    state={{ from: { pathname: '/profile' } }}
                  >
                    <FontAwesomeIcon icon={faUser} className="me-1" />
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
