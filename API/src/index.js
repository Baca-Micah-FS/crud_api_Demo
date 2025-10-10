// Imports express lobrary
const express = require("express");
// imports the cors middle ware. Alows front end to to call backend api
const cors = require("cors");
// adds router buncle from "./routes/index.js"
const routes = require("./routes");
// initializes express app
const app = express();
// allows cors middleware to be use for all routes
app.use(cors());
// parses json request bodies. Makes req.body useable
app.use(express.json());
// mounts everything frmo routes. /students becomes /api/v1
app.use("/api/v1", routes);

module.exports = app;
