const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);