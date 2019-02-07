const {
  onHi
} = require('./handleGreetings');
const {
  verifyUser
} = require('../controllers/user.controller');

const errorEmit = (socket) => {
  return (err) => {
    console.log(err);
    socket.emit('user.error', 'Something went wrong!');
  }
}

const registerEvents = (socket) => {
  socket.on('hi', onHi);
  socket.on('token', (data) => {
    verifyUser(socket, data.token);
  })
}

module.exports = {
  registerEvents
}