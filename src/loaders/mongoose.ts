import mongoose from 'mongoose';
import env from '~/configs/env';

export default async () => {
  await mongoose.connect(env.mongoUri);
  console.log('Connected to MongoDB');
};
