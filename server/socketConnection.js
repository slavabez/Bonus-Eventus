const io = require('socket.io')(3000);
const redis = require('socket.io-redis');
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const io = require("socket.io-emitter")({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD
});


module.exports = io;
