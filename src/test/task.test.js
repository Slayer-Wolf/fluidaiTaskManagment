const request = require("supertest");
const App = require("../App"); // Ensure this points to your express App
const mongoose = require("mongoose");
const User = require("../models/User");
const Task = require("../models/Task");
const connectDB = require("../config/db");
let token;
jest.setTimeout(30000);
beforeAll(async () => {
	// Connect to the database
	await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	// Register a new user to get a token
	await User.deleteMany({}); // Clean up the users collection before starting
	await Task.deleteMany({}); // Clean up the tasks collection before starting

	await request(App).post("/api/auth/register").send({
		username: "testuser",
		password: "testpassword",
	});

	const res = await request(App).post("/api/auth/login").send({
		username: "testuser",
		password: "testpassword",
	});

	token = res.body.token;
});

afterAll(async () => {
	// Clean up database and close the connection
	await User.deleteMany({});
	await Task.deleteMany({});
	await mongoose.connection.close();
});

describe("Tasks API", () => {
	let taskId;

	it("should create a new task", async () => {
		const res = await request(App)
			.post("/api/tasks")
			.set("x-auth-token", token)
			.send({
				title: "Test Task",
				description: "This is a test task",
				dueDate: "2024-07-10",
				priority: "High",
				status: "Pending",
			});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("_id");
		expect(res.body).toHaveProperty("title", "Test Task");

		taskId = res.body._id;
	});

	it("should retrieve all tasks", async () => {
		const res = await request(App).get("/api/tasks").set("x-auth-token", token);

		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBeGreaterThan(0);
	});

	it("should retrieve a single task by ID", async () => {
		const res = await request(App)
			.get(`/api/tasks/${taskId}`)
			.set("x-auth-token", token);

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("_id", taskId);
	});

	it("should update an existing task", async () => {
		const res = await request(App)
			.put(`/api/tasks/${taskId}`)
			.set("x-auth-token", token)
			.send({
				title: "Updated Task Title",
				description: "Updated description",
				dueDate: "2024-07-11",
				priority: "Low",
				status: "Completed",
			});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("title", "Updated Task Title");
	});

	it("should delete a task", async () => {
		const res = await request(App)
			.delete(`/api/tasks/${taskId}`)
			.set("x-auth-token", token);

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("message", "Task deleted");
	});

	it("should return 404 for a non-existent task", async () => {
		const res = await request(App)
			.get(`/api/tasks/${taskId}`)
			.set("x-auth-token", token);

		expect(res.statusCode).toEqual(404);
	});

	it("should return 401 for unauthorized access", async () => {
		const res = await request(App).get("/api/tasks");

		expect(res.statusCode).toEqual(401);
	});
});
