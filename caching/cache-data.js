const redisClient = require("./redis-client");

async function cacheData(key, callback) {
  redisClient.get(key, async (err, data) => {
    if (err) console.error(err);
    if (data)
      return data;
  });
}