import { ERROR_MESSAGES } from '../constants';

/**
 * Generic fetch wrapper with error handling
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} - Resolved with data or rejected with error
 */
export const fetchApi = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Handle different HTTP status codes
    if (response.status === 404) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    }

    if (response.status === 401) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
    }

    if (response.status >= 500) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    if (!response.ok) {
      throw new Error(`${ERROR_MESSAGES.FETCH_FAILED}: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    // Re-throw the error with a more descriptive message if needed
    throw new Error(error.message || ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};

/**
 * Get products from the API
 * @returns {Promise} - Resolved with products data
 */
export const getProducts = async () => {
  const data = await fetchApi('/api/products');
  return data.products || [];
};

/**
 * Get a single product by ID
 * @param {string|number} id - Product ID
 * @returns {Promise} - Resolved with product data
 */
export const getProductById = async (id) => {
  return await fetchApi(`/api/products/${id}`);
};

/**
 * Get categories from the API
 * @returns {Promise} - Resolved with categories data
 */
export const getCategories = async () => {
  return await fetchApi('/api/categories');
};

/**
 * Search products by query
 * @param {string} query - Search query
 * @returns {Promise} - Resolved with search results
 */
export const searchProducts = async (query) => {
  return await fetchApi(`/api/products/search?q=${encodeURIComponent(query)}`);
}; 