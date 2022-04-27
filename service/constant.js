const HEADERS = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json',
};

const REQUEST_METHOD = Object.freeze({
  GET:'GET',
  POST:'POST',
  DELETE:'DELETE',
  PATCH:'PATCH',
  OPTIONS:'OPTIONS',
});

module.exports = {
  HEADERS,
  REQUEST_METHOD
}
