import axios from 'axios';
import Cookies from 'js-cookie';

export const LIMITS = {
  CATEGORIES_LIMITS: 18,
  PRODUCTS_LIMITS: 30,
  RELATED_PRODUCTS_LIMITS: 15,
  POPULAR_PRODUCTS_LIMITS: 14,
};

export const API_ENDPOINTS = {
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  CATEGORIES: '/categories.json',
  PRODUCTS: '/products.json',
  RELATED_PRODUCTS: '/related_products.json',
  POPULAR_PRODUCTS: '/products_popular.json',
  SEARCH: '/search.json',
  ORDERS: '/orders.json',
  ORDER: '/order.json',
  ORDER_STATUS: '/order-status.json',
  ADDRESS: '/address.json',
  PAYMENT: '/payment.json',
  CONTACT: '/contact.json',
  WISHLIST: '/wishlist.json',
};

export const getToken = () => Cookies.get('auth_token');

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const token = getToken();
  config.headers!.Authorization = `Bearer ${token ? token : ''}`;
  return config;
}, Promise.reject);

export default http;
