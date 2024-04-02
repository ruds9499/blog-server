// app.js
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes.js");

// Middleware to parse JSON bodies
app.use(express.json());
// Allow requests from all origins
app.use(cors());

// Allow requests from a specific origin

// Use the router
app.use("/api", router);

const port = 1572;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
