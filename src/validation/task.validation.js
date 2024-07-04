const Joi = require("joi");
const { priority, status, taskId } = require("./custom.validation");

/**
 * Check request *body* for fields
 * - "title" : string and is rewuired
 * - "descripton": string
 * - "dueDate": Date
 * - "priority": string and satisifes the custom priority structure defined in "src/validation/custom.validation.js"
 * - "status": string and satisifes the custom status structure defined in "src/validation/custom.validation.js"
 */
const createTask = {
	body: Joi.object().keys({
		title: Joi.string().required(),
		description: Joi.string().required(),
		dueDate: Joi.date(),
		priority: Joi.string().custom(priority).required(),
		status: Joi.string().custom(status).required(),
	}),
};

/**
 * Check request *params* for fields
 * - "taskId" : string and  satisifes the custom taskId structure defined in "src/validations/custom.validation.js"
 */

const getTaskById = {
	params: Joi.object().keys({
		id: Joi.string().custom(taskId),
	}),
};

/**
 * Check request *body* and *params* for fields
 * - "title" : string and is rewuired
 * - "descripton": string
 * - "dueDate": Date
 * - "priority": string and satisifes the custom priority structure defined in "src/validation/custom.validation.js"
 * - "status": string and satisifes the custom status structure defined in "src/validation/custom.validation.js"
 */

const updateTask = {
	params: Joi.object().keys({
		id: Joi.string().custom(taskId),
	}),
	body: Joi.object().keys({
		title: Joi.string().required(),
		description: Joi.string().required(),
		dueDate: Joi.date().required(),
		priority: Joi.string().custom(priority).required(),
		status: Joi.string().custom(status).required(),
	}),
};

/**
 * Check request *params* for fields
 * - "taskId" : string and  satisifes the custom taskId structure defined in "src/validations/custom.validation.js"
 */

const deleteTask = {
	params: Joi.object().keys({
		id: Joi.string().custom(taskId),
	}),
};

module.exports = {
	createTask,
	getTaskById,
	updateTask,
	deleteTask,
};
