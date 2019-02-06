require('dotenv').config();
const express = require('express');
const app = express();
const {
  redisClient
} = require('./config/redis');

// redisClient.set('COUNT', 0);

app.get('/', async (req, res) => {
  redisClient.incr('COUNT');
  try {
    let count = await redisClient.getAsync('COUNT');
    res.send(count);
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(8000);