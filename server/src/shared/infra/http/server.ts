import express, { Express } from 'express';
import { Server } from 'http';

import { appConfig } from '~/config/app';
import { uploadConfig } from '~/config/upload';

import { exceptionHandler } from './middlewares';
import { routes } from './routes';

export class HttpServer {
  private app: Express;

  constructor() {
    this.app = express();

    this.applyMiddlewares();
    this.applyRoutes();
    this.addExceptionHandler();
  }

  private applyMiddlewares(): void {
    this.app.use(express.json());
  }

  private applyRoutes(): void {
    this.app.use(
      appConfig.uploadsRoute,
      express.static(uploadConfig.directory)
    );

    this.app.use(routes);
  }

  // TODO enable cors
  // private enableCors(): void {}

  private addExceptionHandler(): void {
    this.app.use(exceptionHandler);
  }

  public listen(port: number, callback?: () => void): Server {
    return this.app.listen(port, callback);
  }
}
