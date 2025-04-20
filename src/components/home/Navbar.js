import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  selectCategories,
  selectSelectedCategory,
  selectCategoryStatus,
  selectCategoryError,
} from "../../redux/features/categorySlice"; // Adjust path
import { selectProducts } from "../../redux/features/productSlice";
function Navbar() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const status = useSelector(selectCategoryStatus);
  const error = useSelector(selectCategoryError);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  // Filter categories that have products
  const categoriesWithProducts = categories.filter((category) => {
    return products.some(
      (product) =>
        product.category.toLowerCase() === category.slug.toLowerCase()
    );
  });
  const handleCategoryClick = (categorySlug) => {
    dispatch(selectSelectedCategory(categorySlug));
  };

  return (
    <nav className="navbar bg-white border border-secondary">
      <div>
        <ul className="nav list-style-none d-flex overflow-scroll flex-nowrap vw-100">
          {status === "loading" && <li>Loading categories...</li>}
          {status === "failed" && <li>Error: {error}</li>}
          {status === "succeeded" && (
            <>
              {" "}
              <li key="all" className="nav-item">
                <Link
                  to="/products"
                  className="nav-link text-dark fw-bold"
                  onClick={() => handleCategoryClick(null)}
                >
                  <span>All</span>
                </Link>
              </li>
              {categoriesWithProducts.map((category) => (
                <li key={category.slug} className="nav-item">
                  <Link
                    to={`/products/category/${category.slug}`}
                    className="nav-link d-flex flex-column text-dark fw-bold"
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
