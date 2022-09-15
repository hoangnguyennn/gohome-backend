import { Application, json, urlencoded } from 'express';
import apiRoutes from '~/apis/routes';
import env from '~/configs/env';
import errorHandler from '~/helpers/errorHandler';

export default async ({ app }: { app: Application }) => {
  // load middlewares
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // load routes
  app.use(env.apiPrefix, apiRoutes);

  // load error handler
  app.use(errorHandler);
};
