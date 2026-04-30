const mongoose = require("mongoose");
const Task = require("../models/Task");

// Mock Data Storage
let MOCK_TASKS = [];
let nextTaskId = 1;

const isDBConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    if (isDBConnected()) {
      const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
      return res.status(200).json(tasks);
    }
    
    // Mock Mode
    const userTasks = MOCK_TASKS.filter(t => t.user === req.user.id).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json(userTasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, category } = req.body;
    if (!title) return res.status(400).json({ message: "Task title is required" });

    if (isDBConnected()) {
      const task = await Task.create({ 
        title, 
        description: description || "", 
        status: status || "pending",
        priority: priority || "Medium",
        dueDate: dueDate || null,
        category: category || "General",
        user: req.user.id
      });
      return res.status(201).json(task);
    }

    // Mock Mode
    const newTask = {
      _id: String(nextTaskId++),
      title,
      description: description || "",
      status: status || "pending",
      priority: priority || "Medium",
      dueDate: dueDate || null,
      category: category || "General",
      user: req.user.id,
      createdAt: new Date().toISOString()
    };
    MOCK_TASKS.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ message: "Task not found" });
      if (task.user.toString() !== req.user.id) return res.status(401).json({ message: "User not authorized" });

      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      return res.status(200).json(updatedTask);
    }

    // Mock Mode
    const idx = MOCK_TASKS.findIndex(t => t._id === id);
    if (idx === -1) return res.status(404).json({ message: "Task not found" });
    if (MOCK_TASKS[idx].user !== req.user.id) return res.status(401).json({ message: "User not authorized" });

    MOCK_TASKS[idx] = { ...MOCK_TASKS[idx], ...req.body };
    res.status(200).json(MOCK_TASKS[idx]);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ message: "Task not found" });
      if (task.user.toString() !== req.user.id) return res.status(401).json({ message: "User not authorized" });

      await task.deleteOne();
      return res.status(200).json({ message: "Task removed successfully", id });
    }

    // Mock Mode
    const idx = MOCK_TASKS.findIndex(t => t._id === id);
    if (idx === -1) return res.status(404).json({ message: "Task not found" });
    if (MOCK_TASKS[idx].user !== req.user.id) return res.status(401).json({ message: "User not authorized" });

    MOCK_TASKS.splice(idx, 1);
    res.status(200).json({ message: "Task removed successfully", id });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
