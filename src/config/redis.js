const Redis = require('ioredis');
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  db: 0
});

module.exports = redis;
