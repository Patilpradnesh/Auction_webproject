const { getRedisClient } = require("./redisClient");

// ─── Key Helpers ─────────────────────────────────────────────
const keys = {
  currentPrice: (auctionId) => `auction:${auctionId}:current_price`,
  leaderboard:  (auctionId) => `auction:${auctionId}:leaderboard`,
  lock:         (auctionId) => `lock:auction:${auctionId}`,
  endTime:      (auctionId) => `auction:${auctionId}:end_time`,
  rateLimit:    (userId, auctionId) => `ratelimit:${userId}:${auctionId}`,
};

// ─── Seed auction state into Redis (called when auction goes active) ──
const seedAuctionState = async (auctionId, currentPrice, endTime) => {
  const redis = getRedisClient();
  await redis.set(keys.currentPrice(auctionId), String(currentPrice));
  await redis.set(keys.endTime(auctionId), String(new Date(endTime).getTime()));
  console.log(`Auction ${auctionId} seeded into Redis`);
};

// ─── Get current auction state from Redis ────────────────────
const getAuctionState = async (auctionId) => {
  const redis = getRedisClient();

  const [price, endTime, top3] = await Promise.all([
    redis.get(keys.currentPrice(auctionId)),
    redis.get(keys.endTime(auctionId)),
    redis.zRangeWithScores(keys.leaderboard(auctionId), 0, 2, { REV: true }),
  ]);

  return {
    currentPrice: price ? parseFloat(price) : null,
    endTime: endTime ? parseInt(endTime) : null,
    leaderboard: top3,
  };
};

// ─── Rate limit check (max 5 bids/min per user per auction) ──
const checkRateLimit = async (userId, auctionId) => {
  const redis = getRedisClient();
  const key = keys.rateLimit(userId, auctionId);
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60); // 60 second window
  return count <= 5; // true = allowed, false = rate limited
};

// ─── Distributed Lock + Bid Placement ────────────────────────
/**
 * Acquire Redis lock, validate and apply bid atomically.
 * Returns { success, reason, newPrice, endTime }
 */
const placeBidWithLock = async (auctionId, bidderId, amount, minimumIncrement) => {
  const redis = getRedisClient();
  const lockKey = keys.lock(auctionId);
  const requestId = `${bidderId}-${Date.now()}`;
  const LOCK_TTL_MS = 500;
  const ANTI_SNIPE_MS = 30_000; // 30 seconds

  // 1. Acquire distributed lock (SET NX PX — atomic)
  const acquired = await redis.set(lockKey, requestId, {
    NX: true,
    PX: LOCK_TTL_MS,
  });

  if (!acquired) {
    return { success: false, reason: "LOCK_CONTENTION" };
  }

  try {
    // 2. Read current state
    const currentPrice = parseFloat(
      (await redis.get(keys.currentPrice(auctionId))) || "0"
    );
    const endTimeMs = parseInt(
      (await redis.get(keys.endTime(auctionId))) || "0"
    );
    const now = Date.now();

    // 3. Auction ended check
    if (now > endTimeMs) {
      return { success: false, reason: "AUCTION_ENDED" };
    }

    // 4. Minimum bid check
    const minBid = currentPrice + minimumIncrement;
    if (amount < minBid) {
      return {
        success: false,
        reason: `BID_TOO_LOW`,
        minRequired: minBid,
        currentPrice,
      };
    }

    // 5. Anti-sniping — extend if bid in last 30s
    let newEndTime = endTimeMs;
    if (endTimeMs - now < ANTI_SNIPE_MS) {
      newEndTime = now + ANTI_SNIPE_MS;
      await redis.set(keys.endTime(auctionId), String(newEndTime));
    }

    // 6. Update price + leaderboard atomically
    await redis.set(keys.currentPrice(auctionId), String(amount));
    await redis.zAdd(keys.leaderboard(auctionId), {
      score: amount,
      value: bidderId,
    });

    return {
      success: true,
      newPrice: amount,
      endTime: newEndTime,
      extended: newEndTime !== endTimeMs,
    };

  } finally {
    // 7. Release lock — only if we still own it (atomic Lua script)
    const releaseLua = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    await redis.eval(releaseLua, {
      keys: [lockKey],
      arguments: [requestId],
    });
  }
};

module.exports = {
  seedAuctionState,
  getAuctionState,
  checkRateLimit,
  placeBidWithLock,
  keys,
};
