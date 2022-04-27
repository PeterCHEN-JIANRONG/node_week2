const { HEADERS, REQUEST_METHOD } = require("../service/constant");
const { successHandle, errorHandle } = require("../service/httpHandle");
const Post = require("../models/post");
// controllers，不使用解構，較容易找到 controller 來源
const HttpControllers = require("../controllers/http");
const PostsControllers = require("../controllers/posts");

const routers = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk)); // 接收資料

  console.log(req.method, req.url); // 測試用, 觀看呼叫 http method & path

  if (req.url === "/posts" && req.method === REQUEST_METHOD.GET) {
    PostsControllers.getPosts(req, res);
  } else if (req.url === "/posts" && req.method === REQUEST_METHOD.POST) {
    // 小技巧: createPosts()使用物件傳資料，可以不管參數順序，缺點:參數不能更名
    req.on("end", () => PostsControllers.createPosts({ body, req, res }));
  } else if (req.url === "/posts" && req.method === REQUEST_METHOD.DELETE) {
    PostsControllers.deleteAllPosts(req, res);
  } else if (
    req.url.startsWith("/posts/") &&
    req.method === REQUEST_METHOD.DELETE
  ) {
    PostsControllers.deleteOnePost(req, res);
  } else if (
    req.url.startsWith("/posts/") &&
    req.method === REQUEST_METHOD.PATCH
  ) {
    req.on("end", () => PostsControllers.updatePosts({ body, req, res }));
  } else if (req.method === REQUEST_METHOD.OPTIONS) {
    HttpControllers.cors(req, res);
  } else {
    HttpControllers.notFound(req, res);
  }
};

module.exports = routers;
