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

  let body = '';
  req.on('data', chunk => body+=chunk); // 接收資料
  
  if(req.url === '/posts' && req.method === REQUEST_METHOD.GET){
    const posts = await Post.find();
    successHandle(res, posts);
  } else if(req.url === '/posts' && req.method === REQUEST_METHOD.POST){
    req.on('end', async ()=>{
      try{
        const data = JSON.parse(body);
        const { title } = data;
        if(title !== undefined){
          // 新增資料
          const post = await Post.create({
            title
          })
          const posts = await Post.find();
          successHandle(res, posts);
        } else {
          errorHandle(res, '標題必填')
        }
      }catch(err){
        errorHandle(res, err);
      }
    })
  } else if(req.url === '/posts' && req.method === REQUEST_METHOD.DELETE){
    await Post.deleteMany({});
    const posts = await Post.find();
    successHandle(res, posts);
  } else if(req.url.startsWith('/posts/') && req.method === REQUEST_METHOD.DELETE){
    const id = req.url.split('/').pop();
    const post = await Post.findByIdAndDelete(id);
    const posts = await Post.find();
    if(post !== null){
      successHandle(res, posts); // 單筆刪除成功
    } else {
      errorHandle(res, '查無此 id'); // 查無 id
    }
  } else if(req.url.startsWith('/posts/') && req.method === REQUEST_METHOD.PATCH){
    req.on('end', async ()=>{
      try{
        const data = JSON.parse(body);
        const id = req.url.split('/').pop();
        const { title } = data;

        if( title !== undefined && title !== ""){
          const post = await Post.findByIdAndUpdate(id,{
            title
          })
          const posts = await Post.find();
          if(post !== null){
            successHandle(res, posts);
          } else{
            errorHandle(res, '查無此 id'); // 查無 id
          }
        } else {
          errorHandle(res, '標題必填');
        }
      } catch (err){
        errorHandle(res, err);
      }
    })
  
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
