import express from 'express';
import cors from 'cors';
import path from 'path';
import { setupApiRoutes } from './api';
import { Logger } from 'ferrarius';

const frontendDirectory = path.resolve(__dirname, '..', 'lib', 'static');

const MONITOR_PORT: number = Number(process.env.MONITOR_PORT || 3000);

function setupRoutes(options?: any): express.Router {
  const router = express.Router();
  router.use('/', express.static(frontendDirectory));
  router.use('/api', setupApiRoutes(options));

  return router;
}

export function initialise(options?: any): void {
  if (!options || !options.masterServer) {
    Logger.error('Monitor is missing the dependency of Ferrarius master server!');
    return;
  }

  const app: express.Application = express();

  app.use(cors());
  app.use(express.json());
  app.use("/ferrarius", setupRoutes(options));

  app.listen(MONITOR_PORT, () => console.log(`Monitor listening on ${MONITOR_PORT}`));
}
