import express, { Application } from 'express';
import { PORT } from './config';
import { getSequences, getToken, insertSequences } from './controller';
import { auth } from './middleware/auth';
import { validateSequence } from './middleware/validationBody';

const app: Application = express();
app.use(express.json());

app.get('/token', getToken);

app.post('/sequences', auth, validateSequence, insertSequences);

app.get('/sequences', auth, getSequences);

app.listen(PORT, () => {
  console.log(`Server is up at http://localhost:${PORT}`);
});
