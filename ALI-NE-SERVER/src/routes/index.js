const express = require('express');
const userRoutes = require('./userRoutes');
const restaurantRoutes = require('./restaurantRoutes');

const router = express.Router()

//user routes
router.use('/users', userRoutes);

//restaurant routes
router.use('/restaurants', restaurantRoutes);


module.exports = router;
