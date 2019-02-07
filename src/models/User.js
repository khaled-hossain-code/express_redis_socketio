const redis = require('./config/redis');

const storeUser = (socketID, user) => {
  redis.set(socketID, user)
}

const getUser = (socketID) => {
  return redis.get(socketID)
}

module.exports = {
  storeUser
}