const express = require("express");
const { registerDefinition } = require("swaggiffy");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const authMiddleware = require("../middleware/authMiddleware");
const Restaurant = require("../models/Restaurant");

// Create a new restaurant
router.post("/add", authMiddleware, restaurantController.createRestaurant);

// Get all restaurants
router.get("/all", authMiddleware, restaurantController.getAllRestaurants);

// Get a specific restaurant
router.get(
  "/update/:id",
  authMiddleware,
  restaurantController.getRestaurantById
);

// Update a restaurant
router.put(
  "/update/:id",
  authMiddleware,
  restaurantController.updateRestaurant
);

// Delete a restaurant
router.delete(
  "/delete/:id",
  authMiddleware,
  restaurantController.deleteRestaurant
);

registerDefinition(router, {
  tags: "Restaurant",
  mappedSchema: "Restaurant",
  basePath: "/api/v1/restaurants",
});

module.exports = router;
