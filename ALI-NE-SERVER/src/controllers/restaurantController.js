const Restaurant = require("../models/Restaurant");

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  const payload = req.body;
  const user = req.user;
  payload.owner = user.userId;
  try {
    const restaurant = await Restaurant.create(payload);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  const {userId} = req.user;
  try {
    const restaurants = await Restaurant.find().populate("owner");
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve restaurants" });
  }
};

// Get a specific restaurant
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the restaurant" });
  }
};

// Update a restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Create a new menu item object with the required fields
    const newMenuItem = {
      name: req.body.menu[0].name,
      price: req.body.menu[0].price,
      description: req.body.menu[0].description,
    };
    // Update the restaurant with the new menu item
    restaurant.menu.push(newMenuItem);
    const updatedRestaurant = await restaurant.save();

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json(error);
  }
};


// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndRemove(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the restaurant" });
  }
};
