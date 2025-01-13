import {createServer} from './utils/server.utils'

const port = process.env.PORT || 4000;

const app = createServer();

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
});
