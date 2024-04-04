// PostController.js
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
const PostController = {
  getPosts: async (req, res) => {
    try {
      const { cat, page = "1" } = req.body;
      const pageSize = 5;
      const pageNumber = parseInt(page);
      let posts;
      let response = {};

      if (cat) {
        posts = await db.collection("Post").find({ catSlug: cat }).toArray();
      } else {
        posts = await db.collection("Post").find({}).toArray();
      }

      response.total = posts.length;

      // reverse post and slice the posts array based on the page number and page size
      posts = posts
        .reverse()
        .slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
      // formate the posts createdAt field in date format yyyy-mm-dd without substring method
      posts = posts.map((post) => {
        post.createdAt = new Date(post.createdAt).toJSON().split("T")[0];
        return post;
      });
      response.posts = posts;

      return res.status(200).json(response);
    } catch (err) {
      console.error("Error fetching posts", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getPostBySlug: async (req, res) => {
    try {
      const { slug } = req.body;
      // find the post where slug field matches the slug parameter
      const post = await db.collection("Post").findOne({ slug: slug });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      // formate the posts createdAt field in date format yyyy-mm-dd without substring method
      post.createdAt = new Date(post.createdAt).toJSON().split("T")[0];
      
      return res.status(200).json(post);
    } catch (err) {
      console.error("Error fetching post by slug", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      let post = req.body;
      post = {
        ...req.body,
        createdAt: new Date().toJSON(),
        views: 0,
      };
      await db.collection("Post").insertOne(post);
      return res.status(201).json(post);
    } catch (err) {
      console.error("Error creating post", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // find a post by slug and increment the views field by 1
  updateViews: async (req, res) => {
    try {
      const { slug } = req.body;
      const post = await db.collection("Post").findOne({ slug: slug });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      await db
        .collection("Post")
        .updateOne({ slug: slug }, { $set: { views: post.views + 1 } });
      return res.status(200).json({ message: "Views updated" });
    } catch (err) {
      console.error("Error updating views", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // get top 4 posts based on views
  getTopPosts: async (req, res) => {
    try {
      const posts = await db
        .collection("Post")
        .find({})
        .sort({ views: -1 })
        .limit(4)
        .toArray();
      return res.status(200).json(posts);
    } catch (err) {
      console.error("Error fetching top posts", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = PostController;
