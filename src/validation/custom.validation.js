/**
 *
 * @param {string} value
 * @param {object} helpers
 * @returns
 */

/**
 * * custom valiation for taskId
 */

const taskId = (value, helpers) => {
	if (!value.match(/^[0-9a-fA-F]{24}$/)) {
		return helpers.message('"{{#id}}" must be a valid mongo id');
	}
	return value;
};

/**
 * * custom valiation for PassWord
 */

const password = (value, helpers) => {
	if (value.length < 8) {
		return helpers.message("Password must be 8 haracters or more");
	}
	return value;
};

/**
 * * custom valiation for Priority
 */

// Custom validation functions
const priority = (value, helpers) => {
	const validPriorities = ["High", "Low", "Urgent"];
	if (!validPriorities.includes(value)) {
		return helpers.message(
			"Please provide a valid priority (e.g., High, Low, Urgent)",
		);
	}
	return value;
};

/**
 * * custom valiation for status
 */

// Custom validation functions

const status = (value, helpers) => {
	const validStatuses = ["Pending", "In Progress", "Completed"];
	if (!validStatuses.includes(value)) {
		return helpers.message(
			"Please provide a valid status (e.g., Pending, In Progress, Completed)",
		);
	}
	return value;
};

module.exports = {
	taskId,
	password,
	priority,
	status,
};
