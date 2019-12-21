import express from 'express';
import cors from 'cors';
import path from 'path';
import { setupApiRoutes } from './api';

const frontendDirectory = path.resolve(__dirname, '..', 'lib', 'static');

const MONITOR_PORT: number = Number(process.env.MONITOR_PORT || 3000);

function setupRoutes(): express.Router {
  const router = express.Router();
  router.use('/', express.static(frontendDirectory));
  router.use('/api', setupApiRoutes());

  return router;
}

export function initialise(options?: any): void {

  if (!options) options = {};

  const app: express.Application = express();

  app.use(cors());
  app.use(express.json());
  app.use("/ferrarius", setupRoutes());

  app.listen(MONITOR_PORT, () => console.log(`Monitor listening on ${MONITOR_PORT}`));
}
