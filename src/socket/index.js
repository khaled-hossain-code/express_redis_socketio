const {onHi} = require('./handleGreetings');

const errorEmit = (socket) => {
  return (err) => {
    console.log(err);
    socket.emit('user.error', 'Something went wrong!');
  }
}

const registerEvents = (socket) => {
  socket.on('hi', onHi);
}

module.exports = {
  registerEvents
}