import { createServer } from './utils/server.utils'
import serverless from 'serverless-http';

const app = createServer();

export const handler = serverless(app);