const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  desc: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  postSlug: {
    type: String,
    required: true,
  },
});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
