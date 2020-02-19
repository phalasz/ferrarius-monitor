import express from 'express';
import cors from 'cors';
import path from 'path';
import { setupApiRoutes } from './api';
import { Server } from 'ferrarius';

const frontendDirectory = path.resolve(__dirname, '..', 'lib', 'static');

const MONITOR_PORT: number = Number(process.env.MONITOR_PORT || 3000);

function setupRoutes(masterServer: Server): express.Router {
  const router = express.Router();
  router.use('/', express.static(frontendDirectory));
  router.use('/api', setupApiRoutes(masterServer));

  return router;
}

interface ErrorWithStatus extends Error {
  status?: number;
}

export function initialise(masterServer: any): void {

  const app: express.Application = express();

  app.use(cors());
  app.use(express.json());
  app.use("/ferrarius", setupRoutes(masterServer));

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    const err: ErrorWithStatus = new Error('File Not Found') as ErrorWithStatus;
    err.status = 404;
    next(err);
  });

  // error handler
  // define as the last app.use callback
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
  });

  app.listen(MONITOR_PORT, () => console.log(`Monitor listening on ${MONITOR_PORT}`));
}
