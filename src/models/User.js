const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 *  *Schema for users
 */

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

/**
 * Hasing password for secure encrpytion using Bcrypt
 */
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	// hash the Password with salt
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});
/**
 *
 * @param {string} password
 * @returns password comparision
 */

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
