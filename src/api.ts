import express from 'express';
import { hostStorage, Logger } from 'ferrarius'

export function setupApiRoutes(options?: any) {
  const api = express.Router();
  const masterServer = options.masterServer;

  api.get('/list', async (req: express.Request, res: express.Response) => {
    try {
      const hosts = await masterServer.query({});

      res.json(
        hosts.map((host) => {
          const data = host.toJSON();

          data.elapsedTime = Date.now() - new Date(host.createdAt).getTime();
          return data;
        })
      );

    } catch (e) {
      const message = e.message;
      Logger.error(message);
      res.status(500);
      res.json(message);
    }
  });

  return api;
}
