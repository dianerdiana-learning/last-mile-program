/**
 * data/store.js
 * In-memory data store for the Online Store API.
 *
 * Resources (Subtask 1.1):
 *   1. products  – items available for purchase
 *   2. orders    – purchase transactions
 *   3. users     – registered customers
 *   4. reviews   – product reviews written by users
 */

// ── Resource 1: Products ──────────────────────────────────────────────────────
const products = [
  {
    id: 101,
    name: 'Wireless Headphones',
    category: 'electronics',
    price: 79.99,
    stock: 50,
  },
  {
    id: 102,
    name: 'Running Shoes',
    category: 'footwear',
    price: 59.99,
    stock: 120,
  },
  {
    id: 103,
    name: 'Python Cookbook',
    category: 'books',
    price: 34.99,
    stock: 30,
  },
  {
    id: 104,
    name: 'USB-C Hub',
    category: 'electronics',
    price: 29.99,
    stock: 200,
  },
  { id: 105, name: 'Yoga Mat', category: 'sports', price: 24.99, stock: 75 },
];

// ── Resource 2: Orders ────────────────────────────────────────────────────────
const orders = [
  {
    id: 1,
    userId: 1,
    productId: 101,
    quantity: 1,
    totalPrice: 79.99,
    status: 'shipped',
  },
  {
    id: 2,
    userId: 2,
    productId: 103,
    quantity: 2,
    totalPrice: 69.98,
    status: 'pending',
  },
  {
    id: 3,
    userId: 1,
    productId: 104,
    quantity: 1,
    totalPrice: 29.99,
    status: 'delivered',
  },
];

// ── Resource 3: Users ─────────────────────────────────────────────────────────
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Carol White', email: 'carol@example.com' },
];

// ── Resource 4: Reviews ───────────────────────────────────────────────────────
const reviews = [
  {
    id: 1,
    productId: 101,
    userId: 1,
    rating: 5,
    comment: 'Excellent sound quality!',
  },
  {
    id: 2,
    productId: 101,
    userId: 2,
    rating: 4,
    comment: 'Good value for the price.',
  },
  {
    id: 3,
    productId: 103,
    userId: 1,
    rating: 5,
    comment: 'A must-have for any developer.',
  },
];

// Simple auto-increment helpers
let nextOrderId = orders.length + 1;
let nextReviewId = reviews.length + 1;

const getNextOrderId = () => nextOrderId++;
const getNextReviewId = () => nextReviewId++;

module.exports = {
  products,
  orders,
  users,
  reviews,
  getNextOrderId,
  getNextReviewId,
};
