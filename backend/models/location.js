const mongoose = require("mongoose");
const Comment = require("./comment");

const LocationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
      type: Date,
      default: Date.now()
  },
  comment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Comment
  }]
});

module.exports = mongoose.model("Location", LocationSchema);
