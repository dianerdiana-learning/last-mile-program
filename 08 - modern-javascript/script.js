// Before: var name = "User";
// After:
const apiEndpoint = 'https://api.example.com'; // Won't change
let score = 0; // Will change during the game

score += 10;
console.log(`Current Score: ${score}`);

// Subtask 3.1: Traditional Function
function add(a, b) {
  return a + b;
}

// Subtask 3.2: Arrow Function Equivalent
const addES6 = (a, b) => a + b;

// With multiple lines:
const greetUser = (name) => {
  const message = 'Welcome back, ';
  return message + name;
};

console.log(addES6(5, 10));

const user = 'Alex';
const status = 'online';

// Before: "User " + user + " is currently " + status
// After:
const notification = `User ${user} is currently ${status}.`;

console.log(notification);

// 5.1 Default Parameters
const welcome = (name = 'Guest') => `Hello, ${name}!`;

// 5.2 Destructuring (Extracting data from objects/arrays)
const settings = { theme: 'dark', volume: 80, notifications: true };
const { theme, volume } = settings;
console.log(`The theme is ${theme}`);

// 5.3 Spread Operator (Copying or merging)
const baseFruits = ['apple', 'banana'];
const allFruits = [...baseFruits, 'kiwi', 'mango']; // Combines them

const updatedSettings = { ...settings, volume: 100 }; // Copy object and change one value

console.log('Updated Volume:', updatedSettings.volume);
