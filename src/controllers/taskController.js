const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
	// console.log(req.body, "task creation");
	try {
		const task = new Task(req.body);
		await task.save();
		res.status(201).json(task);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Get all tasks
exports.getTasks = async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).json(tasks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get a single task by ID
exports.getTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task)
			return res
				.status(404)
				.json({ message: "Task not found, Please Give a Valid Id" });
		res.status(200).json(task);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Update a task

exports.updateTask = async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;

		// console.log(updates);
		// Find the task by ID and update it with the provided data
		const task = await Task.findByIdAndUpdate(id, updates, { new: true });
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		res.status(200).json(task);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Delete a task
exports.deleteTask = async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task)
			return res
				.status(404)
				.json({ message: "Task not found, Please Give a Valid Id" });
		res.status(200).json({ message: "Task deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
