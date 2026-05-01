# JWT Auth Lab Tasks

## Project

- Folder: 15 - jwt-auth-lab/jwt-auth-lab
- Main files:
  - index.js
  - package.json

## Step 1: Project Setup

### Task

- Create project folder for JWT practice.
- Open folder in VS Code.

### Done Criteria

- Project folder opens correctly.
- File explorer shows project files.

## Step 2: Initialize Project and Install Dependencies

### Task

- Initialize Node project.
- Install required packages.

### Commands

```bash
npm init -y
npm install express jsonwebtoken
```

### Done Criteria

- package.json exists.
- express and jsonwebtoken are listed in dependencies.

## Step 3: Create Server File

### Task

- Create index.js as the main server file.

### Done Criteria

- index.js exists in project root.

## Step 4: Setup Basic Express Server

### Task

- Initialize Express app.
- Add JSON middleware.
- Start server on port 3000.

### Core Snippet

```js
const express = require('express');
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Done Criteria

- Server starts with node index.js.
- Console shows server running message.

## Step 5: Add JWT and Sample Users

### Task

- Import jsonwebtoken.
- Define secret key.
- Add in-memory users for authentication tests.

### Core Snippet

```js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mysecretkey';
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' },
];
```

### Done Criteria

- App runs without runtime errors.

## Step 6: Login API (Authentication)

### Task

- Create POST /login route.
- Validate username and password.
- Return signed JWT if credentials are valid.

### Expected Behavior

- Valid credentials: returns token.
- Invalid credentials: 401 with Invalid credentials.

### Test Command

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## Step 7: JWT Verification Middleware

### Task

- Build authenticateToken middleware.
- Read Bearer token from Authorization header.
- Verify token with SECRET_KEY.

### Expected Behavior

- Missing token: 401 Token missing.
- Invalid token: 403 Invalid token.
- Valid token: req.user populated and next() called.

## Step 8: Authorization with Protected Routes

### Subtask 8.1: User Route

- GET /profile
- Requires valid token.
- Returns authenticated user payload.

### Subtask 8.2: Admin Route

- GET /admin
- Requires valid token and role admin.
- Non-admin users get 403 Access denied.

## API Summary

- POST /login
- GET /profile
- GET /admin

## Quick Functional Testing Checklist

- Start server:

```bash
node index.js
```

- Login as admin and copy token.
- Access /profile with Bearer token.
- Access /admin with admin token (should pass).
- Login as normal user and call /admin (should fail with 403).
- Call /profile without token (should fail with 401).
