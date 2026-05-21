// ══════════════════════════════════════════════════════════════════════════════
// mongosh-commands.js
//
// Step-by-step mongosh commands from the lab.
// Paste these directly into a running mongosh session.
// ══════════════════════════════════════════════════════════════════════════════

// ── Step 1 – Database Setup ───────────────────────────────────────────────────

// Subtask 1.1: Start MongoDB Shell (run in your terminal)
// mongosh

// Subtask 1.2: Create / Switch to database
// use crudPracticeDB

// ── Step 2 – Create (Insert) ──────────────────────────────────────────────────

// Insert Single Document
db.items.insertOne({
  title: 'Learn MongoDB',
  description: 'Practice CRUD operations',
  status: 'pending',
});

// Insert Multiple Documents
db.items.insertMany([
  { title: 'Task 1', status: 'pending' },
  { title: 'Task 2', status: 'completed' },
]);

// ── Step 3 – Read (Query) ─────────────────────────────────────────────────────

// Fetch All Documents
db.items.find();

// Fetch with Condition
db.items.find({ status: 'pending' });

// Fetch Single Document
db.items.findOne({ title: 'Task 1' });

// ── Step 4 – Update ───────────────────────────────────────────────────────────

// Update One Document
db.items.updateOne({ title: 'Task 1' }, { $set: { status: 'completed' } });

// Update Multiple Documents
db.items.updateMany({ status: 'pending' }, { $set: { priority: 'high' } });

// ── Step 5 – Delete ───────────────────────────────────────────────────────────

// Delete One Document
db.items.deleteOne({ title: 'Task 2' });

// Delete Multiple Documents
db.items.deleteMany({ status: 'completed' });

// ── Step 6 – Final Verification ───────────────────────────────────────────────

// Confirm collection state after all operations
db.items.find();
