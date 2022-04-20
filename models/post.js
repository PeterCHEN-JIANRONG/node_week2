const {Schema, model} = require('mongoose');

// Schema
const postSchema = new Schema(
  {
    title:{
      type: String,
      required: [true, '標題必填']
    },
    createdAt:{
      type: Date,
      default: Date.now,
      select: false
    }
  },
  {
    versionKey: false,
  }
)

// model
const Post = new model('Post', postSchema);

module.exports = Post;