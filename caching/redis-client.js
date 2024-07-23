const { createClient } = require("redis");

const redisClient = createClient(process.env.PORT);

redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.connect().then(() => console.log("Redis Connected"));

module.exports = redisClient;