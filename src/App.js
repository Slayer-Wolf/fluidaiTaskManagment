const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");

const app = express();
dotenv.config();

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/tasks", auth, taskRoutes);
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 8080;
const TestPort = 8080;
if (process.env.NODE_ENV !== "test") {
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} else
	app.listen(TestPort, () => console.log(`Server running on port ${TestPort}`));
module.exports = app;
