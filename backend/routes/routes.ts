import type { Application, Request, Response } from 'express';
import { validate } from '../middlewares/validateResource';
import { createAuthTokenHandler } from '../controllers/auth.controller';
import { createAuthTokenSchema } from '../schemas/auth.shema';

/**
 * taking http request and forward to controller
 */
function routes(app: Application) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  app.post('/api/createtoken', [validate(createAuthTokenSchema)], createAuthTokenHandler);

  // app.post('/api/createcheck');
}

export { routes };