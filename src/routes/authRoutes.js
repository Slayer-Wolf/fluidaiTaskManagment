const express = require("express");
const { register, login } = require("../controllers/authController");
const validate = require("../middleware/validate");
const userValidation = require("../validation/user.validation");
const router = express.Router();
// routes for authorization and verifcation(Login and Register)
router.post("/register", validate(userValidation.register), register);
router.post("/login", validate(userValidation.login), login);

module.exports = router;
