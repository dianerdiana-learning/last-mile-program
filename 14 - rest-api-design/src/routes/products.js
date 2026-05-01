/**
 * routes/products.js
 *
 * Step 2 – Designing Read Operations (GET)
 * Step 3 – Designing Write Operations (POST, DELETE)  [products resource]
 */

const express = require('express');
const router = express.Router();
const { products, reviews } = require('../data/store');

// ── Subtask 2.1 ── GET /v1/products  (Retrieve Collection) ───────────────────
// Returns all products, optionally filtered / sorted / paginated.
router.get('/', (req, res) => {
  // ── Subtask 2.3 ── Filtering, Sorting & Pagination (Query Parameters) ──────
  // Example: GET /v1/products?category=electronics&sort=price_asc&limit=10
  let result = [...products];

  // --- Filtering ---
  const { category, sort, limit, page } = req.query;

  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
  }

  // --- Sorting ---
  if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
  if (sort === 'name_asc') result.sort((a, b) => a.name.localeCompare(b.name));

  // --- Pagination ---
  const pageSize = parseInt(limit) || result.length;
  const pageIndex = (parseInt(page) || 1) - 1;
  const start = pageIndex * pageSize;
  const paginated = result.slice(start, start + pageSize);

  // 200 OK – successful retrieval of a collection
  res.status(200).json({
    total: result.length,
    page: pageIndex + 1,
    limit: pageSize,
    results: paginated,
  });
});

// ── Subtask 2.2 ── GET /v1/products/:id  (Retrieve Single Resource) ──────────
// Example: GET /v1/products/101
router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));

  if (!product) {
    // 404 Not Found – resource does not exist
    return res.status(404).json({ error: 'Product not found.' });
  }

  // 200 OK – resource found
  res.status(200).json(product);
});

// ── Subtask 4.2 ── GET /v1/products/:productId/reviews  (Nested Resource) ────
// Retrieve reviews contextually linked to a product.
router.get('/:productId/reviews', (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    // 404 Not Found – parent resource does not exist
    return res.status(404).json({ error: 'Product not found.' });
  }

  const productReviews = reviews.filter((r) => r.productId === productId);

  // 200 OK – successful retrieval
  res.status(200).json({
    productId,
    total: productReviews.length,
    reviews: productReviews,
  });
});

module.exports = router;
