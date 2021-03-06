import { Request, Response, NextFunction } from 'express';

import { GoBarberException } from '~/shared/exceptions';

export function exceptionHandler(
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response {
  if (error instanceof GoBarberException)
    return response.status(error.statusCode).json({
      error: error.message,
      status: 'error',
      statusCode: error.statusCode
    });

  return response.status(500).json({
    error: 'Internal server error',
    status: 'error',
    statusCode: 500
  });
}
