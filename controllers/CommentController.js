// CommentController.js
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
const CommentController = {
  getCommentsByPost: async (req, res) => {
    try {
      const { postSlug } = req.body;
      const comments = await db
        .collection("Comment")
        .find({ postSlug })
        .sort({ createdAt: -1 })
        .toArray();
      if (!comments) {
        return res.status(404).json({ error: "Comments not found" });
      }
      return res.status(200).json(comments);
    } catch (err) {
      console.error("Error fetching comments by post", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  postComment: async (req, res) => {
    try {
      const comment = req.body;
      if (!comment) {
        return res.status(400).json({ error: "Bad request" });
      }
      await db.collection("Comment").insertOne(comment);
      return res.status(201).json(comment);
    } catch (err) {
      console.error("Error posting comment", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = CommentController;
