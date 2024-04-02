// routes.js
const express = require("express");
const router = express.Router();

// Import controllers

const categoryController = require("./controllers/CategoryController");
const commentController = require("./controllers/CommentController");
const postController = require("./controllers/PostController");
const userController = require("./controllers/UserController");

router.get("/categories", categoryController.getAllCategories);
router.post("/categories", categoryController.createCategory);

router.post("/comments/getCommentsByPost", commentController.getCommentsByPost);
router.post("/comments/postComment", commentController.postComment);

router.post("/posts/getPosts", postController.getPosts);
router.post("/posts/getPostBySlug", postController.getPostBySlug);
router.post("/posts/create", postController.create);
router.post("/posts/updateViews", postController.updateViews);
router.get("/posts/top", postController.getTopPosts);

router.post("/users/getUserByEmail", userController.getUserByEmail);

module.exports = router;
