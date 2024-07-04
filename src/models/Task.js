const mongoose = require("mongoose");
/**
 * *Schema for Task with all required fields
 */
const TaskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		dueDate: { type: Date },
		priority: { type: String, enum: ["Low", "Urgent", "High"], default: "Low" },
		status: {
			type: String,
			enum: ["Pending", "In Progress", "Completed"],
			default: "Pending",
		},
	},
	{ timestamps: true },
);
// Custom toJSON method to format the date
TaskSchema.set("toJSON", {
	transform: (doc, ret) => {
		ret.dueDate = ret.dueDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
		return ret;
	},
});

module.exports = mongoose.model("Task", TaskSchema);
