const http = require('http');
const mongoose = require('mongoose');
const {HEADERS, REQUEST_METHOD} = require('./methods/constant');
const {successHandle, errorHandle} = require('./methods/httpHandle');
const Post = require('./models/post');

// 資料庫連線
mongoose.connect('mongodb://localhost:27017/todolist')
.then(()=>{
  console.log('資料庫連線成功');
}).catch((err)=>{
  console.log(err);
})



const requestListener = (req, res) =>{
  
}

// server 監聽
const server = http.createServer(requestListener);
server.listen(3005);