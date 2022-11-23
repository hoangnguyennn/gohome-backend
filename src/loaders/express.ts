import { Application, json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import apiRoutes from '~/apis/routes';
import env from '~/configs/env';
import errorHandler from '~/helpers/errorHandler';
import notFound from '~/helpers/notFound';

export default async ({ app }: { app: Application }) => {
  // load middlewares
  app.use(cors());
  app.use(morgan('tiny'));
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // load routes
  app.use(env.apiPrefix, apiRoutes);

  // 404 route
  app.use(notFound);

  // load error handler
  app.use(errorHandler);
};
