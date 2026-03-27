// Subtask 2.1: Create Arrays
const fruits = ['Apple', 'Banana', 'Cherry'];

// Subtask 2.2: Use Array Methods
fruits.push('Date'); // Adds to end: ["Apple", "Banana", "Cherry", "Date"]
fruits.pop(); // Removes last: ["Apple", "Banana", "Cherry"]
fruits.shift(); // Removes first: ["Banana", "Cherry"]
fruits.unshift('Apricot'); // Adds to start: ["Apricot", "Banana", "Cherry"]

console.log('Fruits Array:', fruits);
console.log('Array Length:', fruits.length);

// Subtask 3.1: Create Objects
const student = {
  firstName: 'Jordan',
  age: 21,
  course: 'Web Dev',
};

// Subtask 3.2: Access and Modify Properties
// Dot notation
student.age = 22;

// Bracket notation (useful for dynamic keys)
student['course'] = 'Advanced JavaScript';

console.log('Student Object:', student);

// Subtask 4.1: Apply Array Processing Methods
const numbers = [1, 2, 3, 4, 5];

// Map: Create a new array by doubling each number
const doubled = numbers.map((num) => num * 2);

// Filter: Create a new array with only numbers greater than 2
const filtered = numbers.filter((num) => num > 2);

// forEach: Perform an action for every item
numbers.forEach((num) => console.log('Processing number:', num));

// Subtask 4.2: Combine Objects and Arrays
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
];

// Finding only active users
const activeUsers = users.filter((user) => user.active);
console.log('Active Users:', activeUsers);
