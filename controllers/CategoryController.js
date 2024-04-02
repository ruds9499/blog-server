// CategoryController.js
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
const CategoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await db.collection("Category").find({}).toArray();
      return res.status(200).json(categories);
    } catch (err) {
      console.error("Error fetching categories", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  createCategory: async (req, res) => {
    try {
      const category = req.body;
      await db.collection("Category").insertOne(category);
      return res.status(201).json(category);
    } catch (err) {
      console.error("Error creating category", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = CategoryController;
