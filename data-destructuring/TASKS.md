# Destructuring Practice Tasks

## Project

- Folder: `18 - destructuring-practice`
- Files used:
  - `index.html`
  - `script.js`

## Step 1: Project Setup

### Task

- Create `index.html` and `script.js`.
- Link JavaScript to HTML with:

```html
<script src="script.js"></script>
```

### Done Criteria

- Opening `index.html` in browser loads `script.js`.
- Console output appears without errors.

## Step 2: Array Destructuring

### Task

- Extract values from arrays using destructuring.
- Practice skipping elements.
- Practice rest syntax.

### Examples

```js
const colors = ['red', 'green', 'blue', 'yellow'];
const [first, second] = colors;
const [primary, , tertiary] = colors;
const [head, ...rest] = colors;
```

### Done Criteria

- Variables contain expected values.
- Skipped elements are ignored correctly.

## Step 3: Object Destructuring

### Task

- Extract object properties into variables.

### Example

```js
const student = { id: 101, name: 'Diana', grade: 'A' };
const { id, name, grade } = student;
```

### Done Criteria

- Property values are mapped to variables correctly.

## Step 4: Advanced Destructuring

### Task

- Use nested destructuring.
- Use default values.
- Use variable renaming.

### Example

```js
const user = {
  username: 'dianerdiana',
  preferences: { theme: 'dark' },
};

const {
  username: handle,
  preferences: { theme, language = 'en' },
} = user;
```

### Done Criteria

- Nested properties are extracted.
- Missing values use defaults.
- Renamed variables work as expected.

## Step 5: Destructuring in Functions

### Task

- Use destructuring directly in function parameters.

### Examples

```js
function printProduct({ name, category, price = 0 }) {
  console.log(name, category, price);
}

function summarizeOrder([id, customer, total, status = 'pending']) {
  console.log(id, customer, total, status);
}
```

### Done Criteria

- Functions run with clean parameter handling.
- Defaults apply when arguments are missing.

## Final Check

- Run script:

```bash
node script.js
```

- Verify all sections print correctly in terminal or browser console.
