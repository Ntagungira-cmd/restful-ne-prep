const express = require("express");
const { Swaggiffy } = require("swaggiffy");
const connectDB = require("./utils/dbconnection");
const routes = require("./routes");
const cors = require("cors");

const app = express();
const port = 3000;

//parse requests
app.use(express.json());

// //url encoded
app.use(express.urlencoded({ extended: true }));

//cors
app.use(cors());

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to supaMenu!");
});

//server swagger docs
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//user routes
app.use("/api/v1", routes);

// Connect to MongoDB
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

new Swaggiffy().setupExpress(app).swaggiffy();