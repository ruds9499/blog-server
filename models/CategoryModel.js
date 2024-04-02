const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
  },
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: null,
  },
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
