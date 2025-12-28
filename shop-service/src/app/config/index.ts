import dotenv from "dotenv";

dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,

  mongodb_url: process.env.MONGODB_URL,

  stripe_secret_key: process.env.STRIPE_SECRET_KEY,

  user_client_url: process.env.USER_CLIENT_URL,
  seller_client_url: process.env.SELLER_CLIENT_URL,
};
