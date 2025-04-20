import Navbar from "./Navbar";
import Offers from "./Offers";
import Banners from "./Banners";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/features/productSlice";
import "./Home.css";

// import classNames from "classnames";
function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Filter featured products (adjust this condition as needed)
  const featuredProducts = products.filter((product) => product.rating > 3.5); // Example

  if (status === "loading") {
    return (
      <div className="loading-container">
        <div className="spinner-border text-orange" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="error-container">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Navbar />
      <Banners />
      <Offers productsData={featuredProducts} />
    </div>
  );
}

export default Home;
