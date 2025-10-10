// Loads dot env from package.json and calls .config which read the .env file
const dotenv = require("dotenv").config();

// imports express app exported from src/index.js
const app = require("./src");

// retrieves mongoDB connection
const connectDB = require("./src/db/config");

// picks a port to listen from with app.listen
const PORT = process.env.PORT || 8000;

// Stars the mongoDB connection from MONGODB_URI from config.js and connects the databasa
connectDB();

// Starts http server/PORT and listens for client requests
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
