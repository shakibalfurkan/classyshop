import Redis from "ioredis";
import config from "../config/index.js";

export const redis = new (Redis as any)({
  host: config.redis_host,
  port: config.redis_port,
  password: config.redis_password,
});
