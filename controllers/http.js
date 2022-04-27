const { HEADERS } = require("../service/constant");
const { errorHandle } = require("../service/httpHandle");

const http = {
  cors(req, res) {
    // OPTIONS 預檢請求
    res.writeHead(200, HEADERS);
    res.end();
  },
  notFound(req, res) {
    // 404 Page
    errorHandle(res, "無此網站路由", 404);
  },
};

module.exports = http;
