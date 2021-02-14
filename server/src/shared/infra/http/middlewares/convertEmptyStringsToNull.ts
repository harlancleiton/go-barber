import { Request, Response, NextFunction } from 'express';

export function convertEmptyStringsToNull(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  if (Object.keys(request.body).length) {
    request.body = Object.assign(
      {},
      ...Object.keys(request.body).map(key => ({
        [key]: request.body[key] !== '' ? request.body[key] : null
      }))
    );
  }

  next();
}
