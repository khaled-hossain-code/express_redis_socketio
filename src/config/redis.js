const redis = require('redis');
const bluebird = require('bluebird');
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

bluebird.promisifyAll(redis);

module.exports = {
  redisClient
}
