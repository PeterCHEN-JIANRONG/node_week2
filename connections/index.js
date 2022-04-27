const mongoose = require("mongoose");
const dotenv = require("dotenv");

// 載入 env
dotenv.config({ path: "./config.env" });

// 資料庫連線
const DBUrl = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DBUrl)
  .then(() => {
    console.log("資料庫連線成功");
  })
  .catch((err) => {
    console.log(err);
  });
