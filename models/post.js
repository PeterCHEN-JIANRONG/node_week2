const { Schema, model } = require("mongoose");

// Schema
const postSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "姓名未填寫"],
    },
    content: {
      type: String,
      required: [true, "內容未填寫"],
    },
    image: {
      type: String,
      default: null,
    },
    tags: [
      {
        type: String,
        required: [true, "標籤未填寫"],
      },
    ],
    type: {
      type: String,
      enum: ["person", "group"],
      required: [true, "貼文類型未填寫"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

// model
const Post = new model("Post", postSchema);

module.exports = Post;
