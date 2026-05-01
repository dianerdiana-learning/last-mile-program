# Fullstack Student Flow (Express + MongoDB + React)

This project demonstrates full data flow:

1. Enter data in React form
2. Send to Express API
3. Save to MongoDB via Mongoose
4. Fetch data from API
5. Display records on UI

## Project Structure

```text
19 - fullstack-student-flow/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── src/
│       └── models/
│           └── Student.js
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
└── README.md
```

## Step 1: Backend Setup

### Subtask 1.1 Create Backend Project

Commands used:

```bash
npm init -y
npm install express mongoose cors
```

Validation:

- `package.json` exists in `backend/`
- Dependencies installed: `express`, `mongoose`, `cors`
- No install errors

### Subtask 1.2 Setup Express Server

Implemented in `backend/server.js`:

- `express` imported
- `express.json()` middleware added
- `cors()` enabled
- Server runs on `PORT` (default `5000`)

Validation:

- Start command:

```bash
node server.js
```

- Console should show server message and Mongo connection message.

### Subtask 1.3 Connect to MongoDB

Implemented in `backend/server.js` using:

```js
mongoose.connect(MONGODB_URI);
```

Default URI:

```text
mongodb://127.0.0.1:27017/studentFlowDB
```

Optional env override:

```text
MONGODB_URI=<your-connection-string>
```

Validation:

- MongoDB connected log appears
- No connection error in console

## Step 2: Create Schema and API

### Subtask 2.1 Create Simple Schema

Schema file: `backend/src/models/Student.js`

Fields:

- `name` (String, required)
- `course` (String, required)

Model:

- `Student`

### Subtask 2.2 Create POST API

Route: `POST /students`

Behavior:

- Accepts JSON body from frontend:

```json
{
  "name": "Alice",
  "course": "MERN"
}
```

- Saves document to MongoDB
- Returns success JSON with created student

Success response example:

```json
{
  "message": "Student created successfully",
  "student": {
    "_id": "...",
    "name": "Alice",
    "course": "MERN"
  }
}
```

### Subtask 2.3 Create GET API

Route: `GET /students`

Behavior:

- Fetches all student records
- Returns JSON array

## Step 3: Frontend Setup

### Subtask 3.1 Create React App

A Create React App style frontend is configured in `frontend/` with `react-scripts`.

Run:

```bash
npm install
npm start
```

### Subtask 3.2 Create Form Component

Implemented in `frontend/src/App.js`:

- Input: `name`
- Input: `course`
- Submit button
- State handled using `useState`

### Subtask 3.3 Send Data to Backend

`fetch()` is used to send `POST` request to:

```text
http://localhost:5000/students
```

Validation:

- Data stored in MongoDB
- No CORS errors (backend has `cors()` enabled)
- Success message shown in UI

## Step 4: Fetch and Display Data

### Subtask 4.1 Fetch Data on Load

`useEffect()` calls `GET /students` when app loads.

### Subtask 4.2 Display Data on UI

Records rendered with `.map()` in `App.js`.

Validation:

- Data visible in list
- New record appears after submit (after refetch)

## Step 5: End-to-End Testing

## Run Backend

```bash
cd backend
npm install
npm start
```

## Run Frontend

```bash
cd frontend
npm install
npm start
```

## Test Flow

1. Open frontend in browser (usually `http://localhost:3000`)
2. Enter `name` and `course`
3. Submit form
4. Verify success message
5. Verify new record appears in list
6. Refresh page and ensure records still exist

If using a custom API URL, create `frontend/.env`:

```text
REACT_APP_API_URL=http://localhost:5000
```

Then restart frontend.

## API Quick Test (Postman / curl)

### POST /students

```bash
curl -X POST http://localhost:5000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Diana","course":"Node.js"}'
```

### GET /students

```bash
curl http://localhost:5000/students
```
