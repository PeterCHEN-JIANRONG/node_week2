const routers = require("./routers");

require("./connections"); // DB 連線
// require("./connections") 等同 require("./connections/index")
// 預設載入資料夾內的 index 檔

const app = async (req, res) => {
  routers(req, res);
};

module.exports = app;
