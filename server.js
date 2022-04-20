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



const requestListener = async (req, res) =>{
  
  if(req.url === '/posts' && req.method === REQUEST_METHOD.GET){
    const posts = await Post.find();
    successHandle(res, posts);
  } else if(req.method === REQUEST_METHOD.OPTIONS){
    res.writeHead(200, HEADERS);
    res.end();
  } else {
    // 404 Page
    errorHandle(res, '無此網站路由', 404);
  }
}

// server 監聽
const server = http.createServer(requestListener);
server.listen(3005);