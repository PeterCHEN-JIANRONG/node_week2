const { HEADERS, REQUEST_METHOD } = require("../service/constant");
const { successHandle, errorHandle } = require("../service/httpHandle");
const Post = require("../models/post");

const posts = {
  async getPosts(req, res) {
    const posts = await Post.find();
    successHandle(res, posts);
  },
  async createPosts({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      const { name, content, image, tags, type, likes, comments } = data;

      // 前端阻擋 - 欄位格式不正確
      if (name === undefined) {
        errorHandle(res, "姓名未填寫");
      } else if (content === undefined) {
        errorHandle(res, "內容未填寫");
      } else if (tags === undefined) {
        errorHandle(res, "標籤未填寫");
      } else if (type === undefined) {
        errorHandle(res, "貼文類型未填寫");
      } else {
        // 新增資料
        const post = await Post.create({
          name,
          content,
          image,
          tags,
          type,
          likes,
          comments,
        });
        const posts = await Post.find();
        successHandle(res, posts);
      }
    } catch (err) {
      errorHandle(res, err);
    }
  },
  async deleteAllPosts(req, res) {
    await Post.deleteMany({});
    const posts = await Post.find();
    successHandle(res, posts);
  },
  async deleteOnePost(req, res) {
    try {
      const id = req.url.split("/").pop();
      const post = await Post.findByIdAndDelete(id);
      const posts = await Post.find();
      if (post !== null) {
        successHandle(res, posts); // 單筆刪除成功
      } else {
        errorHandle(res, "查無此 id"); // 查無 id
      }
    } catch (err) {
      // 預防: 網址未帶入 id
      errorHandle(res, err);
    }
  },
  async updatePosts({ body, req, res }) {
    try {
      const data = JSON.parse(body);
      const id = req.url.split("/").pop();
      const { name, content, image, tags, type, likes, comments } = data;

      const post = await Post.findByIdAndUpdate(id, {
        name,
        content,
        image,
        tags,
        type,
        likes,
        comments,
      });
      const posts = await Post.find();
      if (post !== null) {
        successHandle(res, posts);
      } else {
        errorHandle(res, "查無此 id"); // 查無 id
      }
    } catch (err) {
      // 預防: JSON 解析失敗、網址未帶入 id
      errorHandle(res, err);
    }
  },
};

module.exports = posts;
