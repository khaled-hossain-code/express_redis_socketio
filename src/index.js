require('dotenv').config();
const express = require('express');
const redis = require('./config/redis');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {registerEvents} = require('./socket');

app.use(express.static('public'));

redis.hmset('user:1',{
  name: 'john',
  age: 20,
  gender: 'male',
  factory: 1  
});

redis.hmset('user:2',{
  name: 'jane',
  age: 19,
  gender: 'female',
  factory: 1  
});

redis.hmset('user:3',{
  name: 'doe',
  age: 20,
  gender: 'female',
  factory: 1
});

redis.set('user:name:john', 'user:1');
redis.set('user:name:jane', 'user:2');

// redis.lpush('user:age:20', ['user:1', 'user:3']); //lpush will create the namespace and push it. if it exist then again push it
// redis.lpush('user:age:19', 'user:2'); //if it runs twice then same data will be pushed twice

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/user/:userId', async (req, res) => {
  try {
    let user = await redis.hgetall(`user:${req.params.userId}`);
    return res.send(user);
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/user/name/:name', async (req, res) => {
  try {
    let userId = await redis.get(`user:name:${req.params.name}`);
    let user = await redis.hgetall(userId)
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

app.get('/user/age/:age', async (req, res) => {
  try {
    let userIdList = await redis.lrange(`user:age:19`, 0, -1);
    console.log(userIdList);
    let users = await Promise.all(userIdList.map(redis.hgetallAsync));
    res.send(users);
  } catch (error) {
    res.status(500).send(error)
  }
})

io.on('connection', function (socket) {
  console.log('new socket connected');
  registerEvents(socket);

  socket.on('disconnect', function (socket) {
    console.log('one socket got disconnected');
  })
});


server.listen(8000);