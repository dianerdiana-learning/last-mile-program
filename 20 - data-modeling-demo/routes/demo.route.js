const express = require('express');

const User = require('../models/user.model');
const Task = require('../models/task.model');

const router = express.Router();

// Step 4.1: Create sample User + Task documents
router.post('/seed', async (req, res) => {
  try {
    const { user, task } = req.body;

    const createdUser = await User.create({
      name: user?.name,
      email: user?.email,
      createdAt: user?.createdAt,
    });

    const createdTask = await Task.create({
      title: task?.title || 'Sample task',
      description: task?.description || 'Task created from /demo/seed',
      completed: task?.completed || false,
      userId: createdUser._id,
    });

    return res.status(201).json({
      message: 'User and task created successfully',
      user: createdUser,
      task: createdTask,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Failed to create sample data',
      error: error.message,
    });
  }
});

// Step 4.2: Fetch all Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to fetch users', error: error.message });
  }
});

// Step 4.2: Fetch all Tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to fetch tasks', error: error.message });
  }
});

// Step 4.3: Populate user reference in Task documents
router.get('/tasks/populated', async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate({
        path: 'userId',
        select: 'name email createdAt',
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to populate tasks', error: error.message });
  }
});

// Step 5.2: Schema validation test route (intentional invalid insert)
router.post('/validate-invalid', async (req, res) => {
  try {
    await User.create({ name: 'Invalid User' });
    return res.status(201).json({ message: 'Unexpected success' });
  } catch (error) {
    return res.status(400).json({
      message: 'Validation failed as expected',
      error: error.message,
    });
  }
});

module.exports = router;
