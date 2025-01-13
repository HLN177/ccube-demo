import type { Application, Request, Response } from 'express';

/**
 * taking http request and forward to controller
 */
function routes(app: Application) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  app.post('/api/createclient');

  app.post('/api/createcheck');
}

export { routes };