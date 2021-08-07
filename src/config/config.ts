/**
 * **summary**: This method registers the values in the environement to the App Configuration module
 */
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXP_TIME: process.env.JWT_EXP_TIME,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  CACHE_TTL: process.env.CACHE_TTL,
}));
