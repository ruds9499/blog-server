const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: null,
  },
  views: {
    type: Number,
    default: 0,
  },
  catSlug: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
