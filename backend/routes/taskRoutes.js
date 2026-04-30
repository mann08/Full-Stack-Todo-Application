const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// All task routes should be protected
router.use(protect);

// Route for getting all tasks and creating a new task
router.route("/").get(getTasks).post(createTask);

// Route for updating and deleting a specific task by ID
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
