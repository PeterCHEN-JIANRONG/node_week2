const http = require('http');
const {HEADERS, REQUEST_METHOD} = require('./methods/constant');
const {successHandle, errorHandle} = require('./methods/httpHandle');

const requestListener = (req, res) =>{
  
}

// server 監聽
const server = http.createServer(requestListener);
server.listen(3005);