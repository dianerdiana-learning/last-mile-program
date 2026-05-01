/**
 * routes/users.js
 *
 * Step 4 – Hierarchy & Nested Resources
 */

const express = require('express');
const router = express.Router();
const { users, orders } = require('../data/store');

// ── Subtask 4.1 ── GET /v1/users/:userId/orders  (Parent-Child Relationship) ─
// Fetch all orders belonging to a specific user.
router.get('/:userId/orders', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    // 404 Not Found – parent resource (user) does not exist
    return res.status(404).json({ error: 'User not found.' });
  }

  const userOrders = orders.filter((o) => o.userId === userId);

  // 200 OK – successful retrieval
  res.status(200).json({
    userId,
    userName: user.name,
    total: userOrders.length,
    orders: userOrders,
  });
});

module.exports = router;
