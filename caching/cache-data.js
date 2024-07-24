const { CACHE_EXPIRATION } = require("../constants");
const redisClient = require("./redis-client");

async function cacheData(key, callback) {
  const data = await redisClient.get(key);
  if (data !== null)
    return JSON.parse(data);

  const newData = await callback();
  redisClient.setEx(key, CACHE_EXPIRATION, JSON.stringify(newData));
  return newData;
}

module.exports = cacheData;