const { body} = require("express-validator");

exports.validateUser=[
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
]

exports.validateAuth=[
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required")
]