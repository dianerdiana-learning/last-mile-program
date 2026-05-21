// ── Step 4: Basic Express Server Setup ───────────────────────────────────────
const express = require('express');

// ── Step 5: JWT & Sample Users ────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

// Step 5.1 – JWT Secret and in-memory users
const SECRET_KEY = 'mysecretkey';

const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' },
];

// ── Step 7: JWT Verification Middleware ───────────────────────────────────────
// Subtask 7.1 – Reads the Bearer token from the Authorization header,
// verifies it, and attaches the decoded payload to req.user.
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    // No token supplied → 401 Unauthorized
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      // Token invalid or expired → 403 Forbidden
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // attach decoded payload for downstream handlers
    next();
  });
}

// ── Step 6: Login API (Authentication) ───────────────────────────────────────
// Subtask 6.1 – POST /login
// Client sends { username, password }; server returns a signed JWT on success.
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    // 401 Unauthorized – credentials do not match
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Sign a token containing the user's id and role; expires in 1 hour
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: '1h',
  });

  res.json({ token });
});

// ── Step 8: Authorization – Protected Routes ──────────────────────────────────
// Subtask 8.1 – GET /profile (any authenticated user)
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome User', user: req.user });
});

// Subtask 8.2 – GET /admin (admin role only)
app.get('/admin', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    // 403 Forbidden – authenticated but not authorised
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json({ message: 'Welcome Admin' });
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('\nAvailable endpoints:');
  console.log('  POST /login    → returns JWT token');
  console.log('  GET  /profile  → requires valid JWT (any role)');
  console.log('  GET  /admin    → requires valid JWT with role=admin');
});
