/**
 * server.js  –  Online Store REST API
 *
 * Base URI  : http://localhost:3000
 * Versioning: /v1  (Subtask 1.2 – ensures backward compatibility)
 *
 * All route modules are mounted under /v1 to form the full Base URI:
 *   http://localhost:3000/v1/products
 *   http://localhost:3000/v1/orders
 *   http://localhost:3000/v1/users
 */

const express = require('express');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json()); // Parse incoming JSON request bodies

// ── Step 1.2 – Base URI & Versioning ─────────────────────────────────────────
// Prefix every route with /v1 so future API versions (/v2, /v3, …)
// can coexist without breaking existing clients.
app.use('/v1/products', productRoutes);
app.use('/v1/orders', orderRoutes);
app.use('/v1/users', userRoutes);

// ── Health-check root ─────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Online Store API is running.',
    version: 'v1',
    docs: '/v1/products | /v1/orders | /v1/users',
  });
});

// ── 404 handler for undefined routes ─────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\nOnline Store API  –  http://localhost:${PORT}`);
  console.log('Version prefix   :  /v1\n');
  console.log('Available endpoints:');
  console.log('  GET    /v1/products');
  console.log(
    '  GET    /v1/products?category=electronics&sort=price_asc&limit=10',
  );
  console.log('  GET    /v1/products/:id');
  console.log('  GET    /v1/products/:productId/reviews');
  console.log('  POST   /v1/orders');
  console.log('  DELETE /v1/orders/:id');
  console.log('  GET    /v1/users/:userId/orders\n');
});

module.exports = app;
