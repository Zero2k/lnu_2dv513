import { Redis } from 'ioredis';

export const clearUserSessions = async (userId: number, redis: Redis) => {
  const sessionIds = await redis.lrange(`${'userSids'}${userId}`, 0, -1);

  const promises = [];
  for (let i = 0; i < sessionIds.length; i += 1) {
    promises.push(redis.del(`${'sess:'}${sessionIds[i]}`));
  }
  await Promise.all(promises);
};
