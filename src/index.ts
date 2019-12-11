import express from 'express';
import path from 'path';
import { Server } from 'ferrarius';
import { setupApiRoutes } from './api';

const frontendDirectory = path.resolve(__dirname, '..', 'lib', 'static');

export function monitor (server?: Server): express.Router {
  const router = express.Router();
  router.use('/', express.static(frontendDirectory));
  router.use('/api', setupApiRoutes());

  return router;
}
