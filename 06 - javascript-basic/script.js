// Subtask 2.1: Declare Variables
var oldSchool = 'I am a var';
let modernChange = 'I can change';
const permanent = 'I cannot change';

// Subtask 2.2: Display Variable Values
console.log('--- Variables ---');
console.log(oldSchool);
console.log(modernChange);
console.log(permanent);

// Subtask 3.1: Use Different Data Types
const age = 25; // Number
const fullName = 'Alex Druid'; // String
const isStudent = true; // Boolean
const hobbies = ['coding', 'gaming']; // Array
const user = { id: 1, role: 'Admin' }; // Object

// Subtask 3.2: Check Data Types
console.log('--- Data Types ---');
console.log(typeof age); // "number"
console.log(typeof fullName); // "string"
console.log(typeof hobbies); // "object" (Arrays are a type of object in JS)

// Subtask 4.1: Use Arithmetic Operators
const addition = 10 + 5;
const subtraction = 10 - 5;
const multiplication = 10 * 2;
const division = 10 / 2;
console.log('--- Arithmetic ---');
console.log(
  `Addition: ${addition}`,
  `| Subtraction: ${subtraction}`,
  `| Multiplication: ${multiplication}`,
  `| Division: ${division}`,
);

// Subtask 4.2: Use Comparison and Logical Operators
let x = 10;
let y = 20;

console.log('--- Logic ---');
console.log(x < y && x > 5); // true (Both conditions met)
console.log(x === '10'); // false (Strict equality checks value AND type)
