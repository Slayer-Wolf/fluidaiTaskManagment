const Joi = require("joi");
const { password } = require("./custom.validation");

/**
 * Check request *body* for fields (all are *required*)
 * - "username" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 * - "name": string
 */
const register = {
	body: Joi.object().keys({
		username: Joi.string().required(),
		password: Joi.string().required().custom(password),
	}),
};
/**
 * Check request *body* for fields (all are *required*)
 * - "username" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 */

const login = {
	body: Joi.object().keys({
		username: Joi.string().required(),
		password: Joi.string().custom(password).required(),
	}),
};

module.exports = {
	register,
	login,
};
