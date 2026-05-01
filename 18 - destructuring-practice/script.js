'use strict';

console.log('=== Destructuring Practice ===');

// Step 2: Practice Array Destructuring
console.log('\nStep 2: Array Destructuring');
const colors = ['red', 'green', 'blue', 'yellow', 'purple'];

const [firstColor, secondColor, thirdColor] = colors;
console.log('Basic extract:', firstColor, secondColor, thirdColor);

const [primary, , tertiary] = colors;
console.log('Skip middle element:', primary, tertiary);

const [head, ...remainingColors] = colors;
console.log('First + rest:', head, remainingColors);

// Step 3: Practice Object Destructuring
console.log('\nStep 3: Object Destructuring');
const student = {
  id: 101,
  name: 'Diana',
  grade: 'A',
  major: 'Computer Science',
};

const { id, name, grade } = student;
console.log('Extracted props:', id, name, grade);

// Step 4: Use Advanced Destructuring
console.log('\nStep 4: Advanced Destructuring');
const userProfile = {
  username: 'dianerdiana',
  preferences: {
    theme: 'dark',
    language: 'en',
  },
  stats: {
    posts: 42,
    followers: 350,
  },
};

const {
  username: handle,
  preferences: { theme, language = 'id' },
  stats: { posts, following = 0 },
} = userProfile;

console.log('Renamed username:', handle);
console.log('Nested values:', theme, language, posts);
console.log('Default value (following):', following);

const inventoryItem = {
  sku: 'KB-001',
  title: 'Mechanical Keyboard',
};

const { sku, title, price = 0, stock = 0 } = inventoryItem;

console.log('Defaults from object:', sku, title, price, stock);

// Step 5: Use Destructuring in Functions
console.log('\nStep 5: Destructuring in Functions');

function printProduct({ name, category, price = 0 }) {
  console.log(`Product: ${name} | Category: ${category} | Price: $${price}`);
}

function formatUser({ username, role = 'user', active = true }) {
  return `${username} (${role}) - ${active ? 'active' : 'inactive'}`;
}

function summarizeOrder([orderId, customer, total, status = 'pending']) {
  return `Order #${orderId} for ${customer}: $${total} [${status}]`;
}

printProduct({ name: 'Mouse', category: 'Electronics', price: 19.99 });
printProduct({ name: 'Notebook', category: 'Stationery' });

console.log(formatUser({ username: 'admin', role: 'admin', active: true }));
console.log(formatUser({ username: 'guest' }));

console.log(summarizeOrder([1001, 'Alice', 249.5, 'paid']));
console.log(summarizeOrder([1002, 'Bob', 99.99]));

console.log('\n=== Practice Completed ===');
