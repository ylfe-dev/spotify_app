import { createClient } from 'redis';
import redis_auth from './private/redis.js';







export function Redis(query) {

        return RedisClient()
        .then(db => query(db))

}


export async function RedisClient() {
    const redis_client = createClient(redis_auth);
    redis_client.on('error', err => console.error('Redis Client Error', err));
    redis_client.on("connect", () => console.info("You are now connected to redis"));
    await redis_client.connect()
    return redis_client;
}
   