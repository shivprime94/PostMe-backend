const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  content: {
      type: String,
      required: false
  },
  likes: {
      type: Array,
      required: true
  },
  dislikes: {
    type: Array,
    required: true
},
date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('posts', PostSchema);