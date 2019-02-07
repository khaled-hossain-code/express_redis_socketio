const redis = require('./config/redis');

const storeUser = (socket, user) => {
  redis.set(socket.id, user)
}

const getUser = (socketID) => {
  return redis.get(socketID)
}

module.exports = {
  storeUser
}