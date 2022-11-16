import { ErrorRequestHandler } from 'express';

/* eslint-disable no-console */
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error);
  return res.sendStatus(500);
};

export default errorHandler;
