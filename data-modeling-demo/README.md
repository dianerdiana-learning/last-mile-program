# Data Modeling Demo (Express + Mongoose)

This lab demonstrates MongoDB data modeling with two related models:

- User
- Task (references User via ObjectId)

## Project Structure

```text
data-modeling-demo/
│
├── server.js
├── .env
├── config/
│   └── db.js
├── models/
│   ├── user.model.js
│   └── task.model.js
└── routes/
    └── demo.route.js
```

## Step 1: Project Setup

### Subtask 1.1 Create Project Folder

Project folder used:

```text
20 - data-modeling-demo
```

### Subtask 1.2 Initialize Node Project

Commands:

```bash
npm init -y
npm install express mongoose dotenv
```

### Subtask 1.3 Required Files

Implemented files:

- `server.js`
- `config/db.js`
- `models/user.model.js`
- `models/task.model.js`
- `routes/demo.route.js`

## Step 2: Database Connection Setup

### Subtask 2.1 Configure MongoDB Connection

Connection is implemented in `config/db.js` with:

```js
mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
```

### Subtask 2.2 Setup Environment Variables

`.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/dataModelingDemoDB
```

## Step 3: Schema and Model Creation

### Subtask 3.1 User Schema

File: `models/user.model.js`

Fields:

- `name` (String)
- `email` (String, required, unique, basic pattern validation)
- `createdAt` (Date, default now)

### Subtask 3.2 Task Schema

File: `models/task.model.js`

Fields:

- `title` (String, required)
- `description` (String)
- `completed` (Boolean, default false)
- `userId` (ObjectId, ref: `User`, required)

## Step 4: Basic CRUD Operations

Base route prefix:

```text
/api/demo
```

### Subtask 4.1 Create Sample Route

`POST /api/demo/seed`

Creates one User and one Task linked to that user.

Request body example:

```json
{
  "user": {
    "name": "Dian",
    "email": "dian@example.com"
  },
  "task": {
    "title": "Build data model",
    "description": "Create User and Task schema",
    "completed": false
  }
}
```

### Subtask 4.2 Fetch Data Using Models

- `GET /api/demo/users` (all users)
- `GET /api/demo/tasks` (all tasks)

### Subtask 4.3 Populate References

- `GET /api/demo/tasks/populated`

Returns tasks with user details populated from `userId`.

## Step 5: Testing and Validation

### Subtask 5.1 API Testing

Use Postman or Thunder Client with these endpoints.

Quick curl examples:

```bash
curl -X POST http://localhost:5000/api/demo/seed \
  -H "Content-Type: application/json" \
  -d '{"user":{"name":"Dian","email":"dian@example.com"},"task":{"title":"Demo task","description":"Populate test","completed":false}}'

curl http://localhost:5000/api/demo/users
curl http://localhost:5000/api/demo/tasks
curl http://localhost:5000/api/demo/tasks/populated
```

### Subtask 5.2 Schema Validation Testing

Validation test route:

- `POST /api/demo/validate-invalid`

This route tries to create a User without required `email`, and should return a validation error response.

## Step 6: Final Testing and Cleanup

### Subtask 6.1 Functional Testing Checklist

1. Start MongoDB server
2. Run app with `npm start`
3. Create sample data via `POST /api/demo/seed`
4. Verify raw data via `/users` and `/tasks`
5. Verify relation via `/tasks/populated`
6. Confirm validation error via `/validate-invalid`

### Subtask 6.2 Code Cleanup

Completed:

- Removed unused imports
- Kept models and DB config modular
- Separated routes, models, and config for clarity

## Run the Project

```bash
npm install
npm start
```

Dev mode:

```bash
npm run dev
```

If MongoDB is not running locally, you will see:

```text
Database connection failed: connect ECONNREFUSED 127.0.0.1:27017
```

Start MongoDB first, then rerun the server.
