/**
 * routes/orders.js
 *
 * Step 3 – Designing Write Operations (POST, DELETE)
 */

const express = require('express');
const router = express.Router();
const { orders, products, getNextOrderId } = require('../data/store');

// ── Subtask 3.1 ── POST /v1/orders  (Create Resource) ────────────────────────
// Client submits a JSON payload to create a new order.
//
// Expected request body:
// {
//   "userId":    1,
//   "productId": 101,
//   "quantity":  2
// }
router.post('/', (req, res) => {
  const { userId, productId, quantity } = req.body;

  // --- Validation (boundary check) ---
  if (!userId || !productId || !quantity) {
    // 400 Bad Request – required fields are missing
    return res.status(400).json({
      error: 'userId, productId, and quantity are required.',
    });
  }

  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) {
    // 404 Not Found – referenced product does not exist
    return res.status(404).json({ error: 'Product not found.' });
  }

  if (quantity < 1 || quantity > product.stock) {
    // 422 Unprocessable Entity – invalid quantity
    return res.status(422).json({
      error: `Quantity must be between 1 and ${product.stock}.`,
    });
  }

  const newOrder = {
    id: getNextOrderId(),
    userId: parseInt(userId),
    productId: product.id,
    quantity: parseInt(quantity),
    totalPrice: parseFloat((product.price * quantity).toFixed(2)),
    status: 'pending',
  };

  orders.push(newOrder);

  // 201 Created – new resource was successfully created
  res.status(201).json(newOrder);
});

// ── Subtask 3.2 ── DELETE /v1/orders/:id  (Remove Resource) ──────────────────
router.delete('/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const index = orders.findIndex((o) => o.id === orderId);

  if (index === -1) {
    // 404 Not Found – resource does not exist
    return res.status(404).json({ error: 'Order not found.' });
  }

  orders.splice(index, 1);

  // 204 No Content – resource deleted, no body returned
  res.status(204).send();
});

module.exports = router;
