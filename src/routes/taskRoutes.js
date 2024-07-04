const express = require("express");
const {
	createTask,
	getTasks,
	getTask,
	updateTask,
	deleteTask,
} = require("../controllers/taskController");
const validate = require("../middleware/validate");
const taskValidation = require("../validation/task.validation");
const router = express.Router();

/**
 * *Routes defined for task with validation middleware for request body or params using JOI
 */

router.post("/", validate(taskValidation.createTask), createTask);
router.get("/", getTasks);
router.get("/:id", validate(taskValidation.getTaskById), getTask);
router.put("/:id", validate(taskValidation.updateTask), updateTask);
router.delete("/:id", validate(taskValidation.deleteTask), deleteTask);

module.exports = router;
