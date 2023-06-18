const express = require("express");
const { registerDefinition } = require("swaggiffy");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../utils/cloudinary");
const { validateUser, validateAuth } = require("../utils/validations");

const router = express.Router();

// Route for creating a new user
router.post("/add", validateUser, userController.createUser);

// Route for user authentication
router.post("/auth", validateAuth, userController.login);

//Route for profile update
router.put("/update/:_id", authMiddleware, userController.updateProfile);

//Route for getting user profile
router.get("/profile/:_id", authMiddleware, userController.getProfile);

//Route for uploading profile picture
router.post(
  "/upload/:_id",
  authMiddleware,
  upload.single("profilePicture"),
  userController.uploadProfilePicture
);

registerDefinition(router, {
  tags: "User",
  mappedSchema: "User",
  basePath: "/api/v1/users",
});

module.exports = router;
