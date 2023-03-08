/* eslint-disable no-console */
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import errorHandler from '@middlewares/errorHandler';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`🔥 Server running at: http://localhost:${port}`);
});
