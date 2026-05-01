/**
 * src/crud.js
 *
 * MongoDB CRUD Practice – crudPracticeDB
 * ──────────────────────────────────────────────────────────────────────────────
 * This script mirrors every mongosh command from the lab steps so you can run
 * the full CRUD cycle with a single:  npm start
 *
 * Prerequisites:
 *   • MongoDB is running locally on the default port (27017)
 *     Start it with:  mongod  (or via the MongoDB service / Atlas connection)
 *   • To use a remote URI set the MONGODB_URI environment variable, e.g.
 *       $env:MONGODB_URI = "mongodb+srv://user:pass@cluster/crudPracticeDB"
 */

const { MongoClient } = require('mongodb');

// ── Step 1.1 / 1.2 – Connection URI & database name ──────────────────────────
const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'crudPracticeDB'; // use crudPracticeDB

// ── Helper: pretty-print section headings ────────────────────────────────────
function heading(text) {
  console.log('\n' + '─'.repeat(60));
  console.log(` ${text}`);
  console.log('─'.repeat(60));
}

async function run() {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    console.log('✔  Connected to MongoDB');

    // Step 1.2 – Switch to / create crudPracticeDB
    const db = client.db(DB_NAME);
    const collection = db.collection('items');

    // ── Clean slate so the demo is repeatable ─────────────────────────────────
    await collection.drop().catch(() => {}); // ignore error if collection doesn't exist yet

    // ══════════════════════════════════════════════════════════════════════════
    // STEP 2 – CREATE (Insert)
    // ══════════════════════════════════════════════════════════════════════════

    heading('STEP 2 – CREATE OPERATIONS');

    // Step 2 – insertOne
    // db.items.insertOne({ title, description, status })
    const insertOneResult = await collection.insertOne({
      title: 'Learn MongoDB',
      description: 'Practice CRUD operations',
      status: 'pending',
    });
    console.log('insertOne  →', insertOneResult.insertedId);

    // Step 2 – insertMany
    // db.items.insertMany([...])
    const insertManyResult = await collection.insertMany([
      { title: 'Task 1', status: 'pending' },
      { title: 'Task 2', status: 'completed' },
    ]);
    console.log(
      'insertMany → inserted',
      insertManyResult.insertedCount,
      'documents',
    );

    // ══════════════════════════════════════════════════════════════════════════
    // STEP 3 – READ (Query)
    // ══════════════════════════════════════════════════════════════════════════

    heading('STEP 3 – READ OPERATIONS');

    // Step 3 – find() – fetch all documents
    // db.items.find()
    const allDocs = await collection.find().toArray();
    console.log('\nfind() – all documents:');
    allDocs.forEach((d) => console.log(' ', JSON.stringify(d)));

    // Step 3 – find() with condition
    // db.items.find({ status: "pending" })
    const pendingDocs = await collection.find({ status: 'pending' }).toArray();
    console.log('\nfind({ status: "pending" }):');
    pendingDocs.forEach((d) => console.log(' ', JSON.stringify(d)));

    // Step 3 – findOne
    // db.items.findOne({ title: "Task 1" })
    const singleDoc = await collection.findOne({ title: 'Task 1' });
    console.log('\nfindOne({ title: "Task 1" }):', JSON.stringify(singleDoc));

    // ══════════════════════════════════════════════════════════════════════════
    // STEP 4 – UPDATE
    // ══════════════════════════════════════════════════════════════════════════

    heading('STEP 4 – UPDATE OPERATIONS');

    // Step 4 – updateOne
    // db.items.updateOne({ title: "Task 1" }, { $set: { status: "completed" } })
    const updateOneResult = await collection.updateOne(
      { title: 'Task 1' },
      { $set: { status: 'completed' } },
    );
    console.log(
      'updateOne  → matchedCount:',
      updateOneResult.matchedCount,
      '| modifiedCount:',
      updateOneResult.modifiedCount,
    );

    // Step 4 – updateMany
    // db.items.updateMany({ status: "pending" }, { $set: { priority: "high" } })
    const updateManyResult = await collection.updateMany(
      { status: 'pending' },
      { $set: { priority: 'high' } },
    );
    console.log(
      'updateMany → matchedCount:',
      updateManyResult.matchedCount,
      '| modifiedCount:',
      updateManyResult.modifiedCount,
    );

    // Show state after updates
    const afterUpdate = await collection.find().toArray();
    console.log('\nDocuments after updates:');
    afterUpdate.forEach((d) => console.log(' ', JSON.stringify(d)));

    // ══════════════════════════════════════════════════════════════════════════
    // STEP 5 – DELETE
    // ══════════════════════════════════════════════════════════════════════════

    heading('STEP 5 – DELETE OPERATIONS');

    // Step 5 – deleteOne
    // db.items.deleteOne({ title: "Task 2" })
    const deleteOneResult = await collection.deleteOne({ title: 'Task 2' });
    console.log('deleteOne  → deletedCount:', deleteOneResult.deletedCount);

    // Step 5 – deleteMany
    // db.items.deleteMany({ status: "completed" })
    const deleteManyResult = await collection.deleteMany({
      status: 'completed',
    });
    console.log('deleteMany → deletedCount:', deleteManyResult.deletedCount);

    // ══════════════════════════════════════════════════════════════════════════
    // STEP 6 – FINAL TESTING & CLEANUP VERIFICATION
    // ══════════════════════════════════════════════════════════════════════════

    heading('STEP 6 – FINAL STATE VERIFICATION');

    const remaining = await collection.find().toArray();
    if (remaining.length === 0) {
      console.log('Collection is empty – all deleted documents were removed ✔');
    } else {
      console.log('Remaining documents:');
      remaining.forEach((d) => console.log(' ', JSON.stringify(d)));
    }

    heading('ALL CRUD OPERATIONS COMPLETED SUCCESSFULLY ✔');
  } catch (err) {
    console.error('✖  Error:', err.message);
    process.exitCode = 1;
  } finally {
    await client.close();
    console.log('\nConnection closed.');
  }
}

run();
