import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { TokenPayload } from '~/@types/express';
import { authConfig } from '~/config/auth';
import { User } from '~/entities/User';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader)
      response.status(401).json({ error: 'JWT token is missing' });
    else {
      const [, token] = authHeader.split(' ');

      const decoded = verify(
        token,
        authConfig.jwt.options.secret
      ) as TokenPayload;

      const usersRepository = getRepository(User);
      const user = await usersRepository.findOne(decoded.sub);

      if (!user) response.status(401).json({ error: 'User not found' });
      else {
        request.auth = { user, token: decoded };
        next();
      }
    }
  } catch {
    response.status(401).json({ error: 'Invalid JWT token' });
  }
}
