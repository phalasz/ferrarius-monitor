import express from 'express';
import cors from 'cors';
import path from 'path';
import { setupApiRoutes } from './api';
import { Logger, Server } from 'ferrarius';

const frontendDirectory = path.resolve(__dirname, '..', 'lib', 'static');

const MONITOR_PORT: number = Number(process.env.MONITOR_PORT || 3000);

function setupRoutes(masterServer: Server): express.Router {
  const router = express.Router();
  router.use('/', express.static(frontendDirectory));
  router.use('/api', setupApiRoutes(masterServer));

  return router;
}

export function initialise(masterServer: Server): void {

  const app: express.Application = express();

  app.use(cors());
  app.use(express.json());
  app.use("/ferrarius", setupRoutes(masterServer));

  app.listen(MONITOR_PORT, () => console.log(`Monitor listening on ${MONITOR_PORT}`));
}
