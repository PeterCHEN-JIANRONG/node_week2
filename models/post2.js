const { Schema, model } = require('mongoose');

// Schema
const postSchema = new Schema(
  {
    name:{
      type: String,
      required: [true, '姓名必填']
    },
    content:{
      type: String,
      required: [true, '內容必填']
    },
    image:{
      type: String,
      default: null
    },
    tags:{
      type: Array,
      default: []
    },
    type:{
      type: String,
      default: '',
      enum: ['friend', 'group']
    },
    likes:{
      type: Number,
      default: 0
    },
    comments:{
      type: Number,
      default: 0
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