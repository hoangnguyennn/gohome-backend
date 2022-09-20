import { config } from 'dotenv';

const envFound = config();
if (!envFound) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: Number(process.env.PORT),
  apiPrefix: String(process.env.API_PREFIX),
  mongoUri: String(process.env.MONGODB_URI),
  maxOfSalt: Number(process.env.MAX_OF_SALT),
  tokenSecret: String(process.env.TOKEN_SECRET),
  tokenExpiresIn: process.env.TOKEN_EXPIRES_IN
};
