const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
	try {
		const { username, password } = req.body;
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Username already exists" });
		}
		const user = new User({ username, password });
		await user.save();
		res.status(201).json({ message: "User registered Successfully" });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(400).json({ message: "User does not exit!" });
		}
		if (!user || !(await user.comparePassword(password))) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(200).json({ message: "Login Successfull", token });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
