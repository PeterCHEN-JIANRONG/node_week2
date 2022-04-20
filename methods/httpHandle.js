const { HEADERS } = require('./constant');

const errorHandle = (response, message = '程式執行錯誤', statusCode = 400) => {
  response.writeHead(statusCode, HEADERS);
  response.write(JSON.stringify({
    status: 'false',
    message,
  }));
  response.end();
};

const successHandle = (response, data, message = '', statusCode = 200) => {
  response.writeHead(statusCode, HEADERS);
  const obj = {
    status: 'success',
    data,
  }
  if(message !== ''){ // 若有 message 才加進去 response
    obj.message = message;
  }
  response.write(JSON.stringify(obj));
  response.end();
};

module.exports = {
  errorHandle,
  successHandle,
};
