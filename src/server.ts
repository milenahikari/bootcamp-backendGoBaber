import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // precisa ser importado abaixo do express

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import './database';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.log(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});
app.use('/files', express.static(uploadConfig.tmpPath));

app.listen(3333, () => {
  console.log('Server started on port 3333 🐥');
});
