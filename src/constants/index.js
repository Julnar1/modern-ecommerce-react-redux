// API URLs
export const API_BASE_URL = 'https://dummyjson.com';
export const PRODUCTS_API = `${API_BASE_URL}/products`;
export const CATEGORIES_API = `${API_BASE_URL}/products/categories?meta=true`;

// Color codes
export const COLORS = {
  PRIMARY: '#ffa500',
  PRIMARY_DARK: '#ff8c00',
  SECONDARY: '#f0f0f0',
  SECONDARY_DARK: '#e0e0e0',
  TEXT_PRIMARY: '#333333',
  TEXT_SECONDARY: '#666666',
  WHITE: '#ffffff',
  BLACK: '#000000',
  DANGER: '#dc3545',
  SUCCESS: '#28a745',
  INFO: '#17a2b8',
  WARNING: '#ffc107',
  LIGHT: '#f8f9fa',
  DARK: '#343a40',
  BORDER: '#dee2e6',
};

// Animation durations
export const TRANSITION_DURATION = '0.3s';

// Pagination
export const ITEMS_PER_PAGE = 10;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  CART_ITEMS: 'cart_items',
};

// Error messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch data',
  NETWORK_ERROR: 'Network error occurred',
  UNAUTHORIZED: 'Unauthorized access',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Server error occurred',
  VALIDATION_ERROR: 'Validation error',
  UNKNOWN_ERROR: 'An unexpected error occurred',
}; 