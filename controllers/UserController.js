// UserController.js
const { connect } = require("../mongo");

let db;

// Connect to MongoDB
connect()
  .then((database) => {
    db = database;
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  });

// Define the controller methods
const UserController = {
  getUserByEmail: async (req, res) => {
    try {
      const email = decodeURIComponent(req.body.email); // Decode from URL
      const user = await db.collection("User").findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (err) {
      console.error("Error fetching user by email", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = UserController;
