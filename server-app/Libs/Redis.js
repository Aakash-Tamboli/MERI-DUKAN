import Redis from "ioredis"
import dotEnv from 'dotenv';

dotEnv.config();

const redis = new Redis(process.env.UPSTASH_REDIS_URL);
export default redis;
