const { HEADERS, REQUEST_METHOD } = require("./methods/constant");
const { successHandle, errorHandle } = require("./methods/httpHandle");
const Post = require("./models/post");

require("./connections"); // DB 連線
// require("./connections") 等同 require("./connections/index")
// 預設載入資料夾內的 index 檔

const app = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk)); // 接收資料

  if (req.url === "/posts" && req.method === REQUEST_METHOD.GET) {
    const posts = await Post.find();
    successHandle(res, posts);
  } else if (req.url === "/posts" && req.method === REQUEST_METHOD.POST) {
    req.on("end", async () => {
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
    });
  } else if (req.url === "/posts" && req.method === REQUEST_METHOD.DELETE) {
    await Post.deleteMany({});
    const posts = await Post.find();
    successHandle(res, posts);
  } else if (
    req.url.startsWith("/posts/") &&
    req.method === REQUEST_METHOD.DELETE
  ) {
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
  } else if (
    req.url.startsWith("/posts/") &&
    req.method === REQUEST_METHOD.PATCH
  ) {
    req.on("end", async () => {
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
    });
  } else if (req.method === REQUEST_METHOD.OPTIONS) {
    res.writeHead(200, HEADERS);
    res.end();
  } else {
    // 404 Page
    errorHandle(res, "無此網站路由", 404);
  }
};

module.exports = app;
