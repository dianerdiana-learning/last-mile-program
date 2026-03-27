/**
 * JavaScript Event Loop: From Sync to Advanced Flow
 */

// --- Step 1: Synchronous Execution ---
console.log('Step 1: A (Sync)');
console.log('Step 1: B (Sync)');

// --- Step 2: Macrotasks (setTimeout) ---
setTimeout(() => {
  console.log('Step 2: Timeout (Macrotask)');
}, 0);

// --- Step 3: Microtasks (Promises) ---
Promise.resolve().then(() => {
  console.log('Step 3: Promise (Microtask)');
});

// --- Step 4: Microtask vs Macrotask ---
setTimeout(() => {
  console.log('Step 4: Timeout (Macrotask)');
}, 0);

Promise.resolve().then(() => {
  console.log('Step 4: Promise (Microtask)');
});

// --- Step 5: Async/Await Flow ---
async function testAsync() {
  console.log('Step 5: 1 (Inside Async - Sync part)');
  await Promise.resolve();
  console.log('Step 5: 2 (Inside Async - After Await)');
}

console.log('Step 5: 3 (Before calling async)');
testAsync();
console.log('Step 5: 4 (After calling async)');

// --- Step 6: Advanced Flow Challenge ---
console.log('Step 6: A (Sync)');
setTimeout(() => {
  console.log('Step 6: B (Macrotask)');
}, 0);
Promise.resolve().then(() => {
  console.log('Step 6: C (Microtask)');
});
console.log('Step 6: D (Sync)');
