const mongoose = require("mongoose");
const { registerSchema } = require("swaggiffy");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "Restaurant",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
    required: true,
  },
  menu: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          default:
            "https://res.cloudinary.com/rugayi/image/upload/v1686947465/NE/bg_l9nk15.png",
        },
      },
    ],
  },
});

registerSchema("Restaurant", restaurantSchema, { orm: "mongoose" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
