import express from 'express';
import path from 'path';
import { setupApiRoutes } from './api';

const frontendDirectory = path.resolve(__dirname, '..', 'lib', 'static');

export function monitor (): express.Router {
  const router = express.Router();
  router.use('/', express.static(frontendDirectory));
  router.use('/api', setupApiRoutes());

  return router;
}
