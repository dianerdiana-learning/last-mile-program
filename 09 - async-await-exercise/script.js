/**
 * JavaScript Lab: Async Flow Exercises
 * --------------------------------------------------------
 */

// --- STEP 2 & 3: Variables and Data Types ---
const labName = 'JavaScript Mastery Lab'; // Constant (cannot be reassigned)
let studentStatus = 'Active'; // Let (can be reassigned)
let score = 95; // Number
let isComplete = false; // Boolean
let techStack = ['HTML', 'CSS', 'JS']; // Array
let userProfile = { id: 101, name: 'User' }; // Object

console.log(`--- Section 1: Variables [${labName}] ---`);
console.log('User Type:', typeof userProfile);
console.log('Tech Stack Length:', techStack.length);

// --- STEP 4: Modern ES6 Features (Arrow Functions & Destructuring) ---
// Arrow function with default parameter
const updateScore = (points = 0) => {
  score += points;
  return `New Score: ${score}`;
};

// Destructuring & Spread Operator
const { name } = userProfile;
const updatedStack = [...techStack, 'React', 'Node.js'];

console.log(`--- Section 2: ES6 Features ---`);
console.log(updateScore(5));
console.log(`Hello, ${name}. Your updated stack is:`, updatedStack);

// --- STEP 5: Array Methods (Map & Filter) ---
const grades = [85, 92, 78, 95, 88];
const passingGrades = grades.filter((grade) => grade >= 90);
const curvedGrades = grades.map((grade) => grade + 2);

console.log('--- Section 3: Data Processing ---');
console.log('High Achievers:', passingGrades);
console.log('Curved Results:', curvedGrades);

// --- STEP 6: Asynchronous Flow (The Event Loop) ---
console.log('--- Section 4: Event Loop Execution ---');

// 1. Synchronous Code (Starts immediately)
console.log('A: [Sync] Start of script');

// 2. Macrotask (Placed in Callback Queue)
setTimeout(() => {
  console.log('B: [Macrotask] setTimeout (0ms delay)');
}, 0);

// 3. Microtask (Placed in Microtask Queue - Higher priority than Macrotasks)
Promise.resolve().then(() => {
  console.log('C: [Microtask] Promise resolved');
});

// 4. Async/Await Flow
async function handleAsync() {
  console.log('E: [Async] Inside function - before await');
  await Promise.resolve(); // Pauses function execution
  console.log('F: [Async] Inside function - after await');
}

handleAsync();

// 5. Synchronous Code (Ends immediately)
console.log('D: [Sync] End of script');

/**
 * PREDICTED OUTPUT ORDER:
 * 1. A: [Sync] Start
 * 2. E: [Async] Before await
 * 3. D: [Sync] End
 * 4. C: [Microtask] Promise
 * 5. F: [Async] After await (Microtask priority)
 * 6. B: [Macrotask] setTimeout
 */
