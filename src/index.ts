import express from 'express';
import path from 'path';
import { Server } from 'ferrarius';

const frontendDirectory = path.resolve(__dirname, '..', 'lib', 'static');

export function monitor (server?: Server): express.Router {
  const router = express.Router();
  router.use('/', express.static(frontendDirectory));

  return router;
}
