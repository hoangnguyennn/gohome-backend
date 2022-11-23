import mongoose from 'mongoose';
import env from '~/configs/env';

const isDev = process.env.NODE !== 'production';

export default async () => {
  await mongoose.connect(env.mongoUri);
  mongoose.set('debug', isDev);
  console.log('Connected to MongoDB');
};
