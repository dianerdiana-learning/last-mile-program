const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Student = require('./src/models/Student');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentFlowDB';

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running' });
});

app.post('/students', async (req, res) => {
  try {
    const { name, course } = req.body;

    if (!name || !course) {
      return res.status(400).json({ message: 'name and course are required' });
    }

    const student = await Student.create({ name, course });
    return res
      .status(201)
      .json({ message: 'Student created successfully', student });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to create student', error: error.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.status(200).json(students);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to fetch students', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
