import express, { Application, Request, Response } from 'express';
import { PORT } from './config';

const app: Application = express();
const port = PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Server');
});

app.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}`);
});
