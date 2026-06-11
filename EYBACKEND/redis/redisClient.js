const { createClient } = require("redis");

let redisClient = null;

/**
 * Connect to Redis and return the client.
 * Singleton — safe to call multiple times.
 */
const connectRedis = async () => {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > 3) {
          console.error("❌ Redis Connection Failed after 3 attempts. Please check REDIS_URL.");
          return new Error("Retry time exhausted");
        }
        return 1000; // wait 1 second between retries
      }
    }
  });

  redisClient.on("error", (err) => {
    // Suppress spammy ECONNREFUSED logs
    if (err.code !== 'ECONNREFUSED') {
      console.error("Redis Client Error:", err.message);
    }
  });

  redisClient.on("connect", () => {
    console.log("✅ Redis Connected Successfully");
  });

  await redisClient.connect();
  return redisClient;
};

/**
 * Get the active Redis client.
 * Must call connectRedis() first.
 */
const getRedisClient = () => {
  if (!redisClient || !redisClient.isOpen) {
    throw new Error("Redis client not connected. Call connectRedis() first.");
  }
  return redisClient;
};

module.exports = { connectRedis, getRedisClient };
