const express = require('express');
const Task = require('../models/Task');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Middleware to verify user token for all routes
router.use(verifyToken);

// Create Task
router.post('/', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = new Task({ userId: req.userId, title, description, completed: completed || false });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all tasks for user with optional search/filter
router.get('/', async (req, res) => {
  try {
    const { search, completed } = req.query;
    const query = { userId: req.userId };
    if (search) query.title = { $regex: search, $options: 'i' };
    if (completed !== undefined) query.completed = completed === 'true';

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Task fully or partially (PATCH is more RESTful for partial updates, but keeping PUT for your usage)
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: updates },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
