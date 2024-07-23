const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_CONNECTION
})

redisClient.on('error', err => console.log('Redis Client Error', err));

module.exports = redisClient;