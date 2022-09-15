import { Application } from 'express';

import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async ({ app }: { app: Application }) => {
  await mongooseLoader();
  await expressLoader({ app });
};
