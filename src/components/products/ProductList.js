import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/features/productSlice';
import { setSelectedCategory } from '../../redux/features/categorySlice';
import ProductCard from './ProductCard';
import './ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes, faCheck, faThLarge, faThList, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { COLORS } from '../../constants';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const { products, loading, error, searchText, filteredProductsList } = useSelector((state) => state.product);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [minRating, setMinRating] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Update selected category when URL parameter changes
  useEffect(() => {
    if (categorySlug) {
      dispatch(setSelectedCategory(categorySlug));
      setSelectedCategories([categorySlug]);
    } else if (selectedCategory) {
      setSelectedCategories([selectedCategory]);
    } else {
      setSelectedCategories([]);
    }
  }, [categorySlug, dispatch, selectedCategory]);

  // Memoize categories to prevent unnecessary recalculations
  const categories = useMemo(() => {
    return [...new Set(products.map(product => product.category))];
  }, [products]);

  // First filter by search text if it exists
  const searchFilteredProducts = useMemo(() => {
    return searchText && searchText.trim() 
      ? filteredProductsList 
      : products;
  }, [searchText, filteredProductsList, products]);

  // Then apply other filters
  const filteredProducts = useMemo(() => {
    return searchFilteredProducts.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
      const ratingMatch = product.rating >= minRating;
      return categoryMatch && priceMatch && ratingMatch;
    });
  }, [searchFilteredProducts, selectedCategories, priceRange, minRating]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleCategoryToggle = useCallback((category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }, []);

  const handlePriceChange = useCallback((e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  }, []);

  const handleRatingClick = useCallback((rating) => {
    setMinRating(rating === minRating ? 0 : rating);
  }, [minRating]);

  const toggleSidebar = useCallback(() => {
    setShowSidebar(!showSidebar);
  }, [showSidebar]);

  const toggleViewMode = useCallback(() => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  }, [viewMode]);

  const handleClearFilters = useCallback(() => {
    // Clear only the filters specific to this component
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 2000 });
    setMinRating(0);
    dispatch(setSelectedCategory(null));
    
    // Redirect to the main products page
    navigate('/products');
  }, [dispatch, navigate]);

  if (loading) {
    return <LoadingSpinner text="Loading products..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Sidebar Toggle Button for Mobile */}
        <div className="d-md-none mb-3">
          <button 
            className="btn btn-orange w-100" 
            onClick={toggleSidebar}
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            <FontAwesomeIcon icon={faFilter} className="me-2" />
            Filters
          </button>
        </div>

        {/* Sidebar Overlay */}
        {showSidebar && (
          <div className="sidebar-overlay d-md-none" onClick={toggleSidebar} />
        )}

        {/* Filters Sidebar */}
        <div className={`col-md-3 sidebar ${showSidebar ? 'open' : ''}`}>
          <div className="filter-header d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-orange mb-0" style={{ color: COLORS.PRIMARY }}>Filters</h5>
            <button className="btn btn-link text-dark d-md-none" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="filter-section">
            <h6 className="mb-3">Categories</h6>
            <div className="category-list">
              {categories.map(category => (
                <div key={category} className="form-check">
                  <div
                    className={`custom-checkbox ${selectedCategories.includes(category) ? 'selected' : ''}`}
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {selectedCategories.includes(category) && (
                      <FontAwesomeIcon icon={faCheck} className="check-icon" />
                    )}
                  </div>
                  <label
                    className="form-check-label"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h6 className="mb-3">Price Range</h6>
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="number"
                  className="form-control"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  placeholder="Min"
                />
              </div>
              <div className="col-6">
                <input
                  type="number"
                  className="form-control"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h6 className="mb-3">Minimum Rating</h6>
            <div className="rating-filter d-flex gap-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  className={`btn ${minRating === rating ? 'btn-orange' : 'btn-outline-orange'}`}
                  onClick={() => handleRatingClick(rating)}
                  style={{ 
                    backgroundColor: minRating === rating ? COLORS.PRIMARY : 'transparent',
                    color: minRating === rating ? COLORS.WHITE : COLORS.PRIMARY,
                    borderColor: COLORS.PRIMARY
                  }}
                >
                  {rating}+
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn btn-orange w-100 mt-3"
            onClick={handleClearFilters}
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Clear Filters
          </button>
        </div>

        {/* Product Gallery */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">
              {categorySlug ? `${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} Products` : 'Products'}
              {searchText && (
                <span className="ms-2 text-muted">
                  <FontAwesomeIcon icon={faSearch} className="me-1" />
                  "{searchText}"
                </span>
              )}
            </h4>
            <div className="d-flex align-items-center">
              <p className="text-muted mb-0 me-3">
                Showing {filteredProducts.length} of {products.length} items
              </p>
              <div className="btn-group">
                <button 
                  className={`btn ${viewMode === 'grid' ? 'btn-orange' : 'btn-outline-orange'}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                  style={{ 
                    backgroundColor: viewMode === 'grid' ? COLORS.PRIMARY : 'transparent',
                    color: viewMode === 'grid' ? COLORS.WHITE : COLORS.PRIMARY,
                    borderColor: COLORS.PRIMARY
                  }}
                >
                  <FontAwesomeIcon icon={faThLarge} />
                </button>
                <button 
                  className={`btn ${viewMode === 'list' ? 'btn-orange' : 'btn-outline-orange'}`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                  style={{ 
                    backgroundColor: viewMode === 'list' ? COLORS.PRIMARY : 'transparent',
                    color: viewMode === 'list' ? COLORS.WHITE : COLORS.PRIMARY,
                    borderColor: COLORS.PRIMARY
                  }}
                >
                  <FontAwesomeIcon icon={faThList} />
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No products match your filters. Try adjusting your criteria.
            </div>
          ) : (
            <div className={`product-gallery ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
              {filteredProducts.map(product => (
                <div key={product.id} className={`product-item ${viewMode === 'list' ? 'list-item' : 'grid-item'}`}>
                  <div className="product-card-wrapper">
                    <ProductCard product={product} viewMode={viewMode} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductList);
