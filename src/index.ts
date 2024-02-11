import express, { Application, Request, Response } from 'express';
import { generateJwtToken } from './auth/generateJwtToken';
import { PORT } from './config';
import { auth } from './middleware/auth';

const app: Application = express();

app.get('/', auth, (req: Request, res: Response) => {
  res.send('Welcome to the Server');
});

app.get('/token', (req: Request, res: Response) => {
  const token = generateJwtToken();
  res.send(token);
});

app.listen(PORT, () => {
  console.log(`Server is up at http://localhost:${PORT}`);
});
