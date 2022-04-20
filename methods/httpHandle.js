const { HEADERS } = require('./constant');

const errorHandle = (response, message = '程式執行錯誤', statusCode = 400) => {
  response.writeHead(statusCode, HEADERS);
  response.write(JSON.stringify({
    status: 'false',
    message,
  }));
  response.end();
};

const successHandle = (response, data, statusCode = 200) => {
  response.writeHead(statusCode, HEADERS);
  response.write(JSON.stringify({
    status: 'success',
    data,
  }));
  response.end();
};

module.exports = {
  errorHandle,
  successHandle,
};
