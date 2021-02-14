import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { TokenPayload } from '~/@types/express';
import { authConfig } from '~/config/auth';
import { User } from '~/modules/users/infra/typeorm/entities';
import { GoBarberException } from '~/shared/exceptions/GoBarberException';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new GoBarberException('JWT token is missing', 401);
    else {
      const [, token] = authHeader.split(' ');

      const decoded = verify(
        token,
        authConfig.jwt.options.secret
      ) as TokenPayload;

      const usersRepository = getRepository(User);
      const user = await usersRepository.findOne(decoded.sub);

      if (!user) throw new GoBarberException('User not found', 401);
      else {
        request.auth = { user, token: decoded };
        next();
      }
    }
  } catch {
    throw new GoBarberException('Invalid JWT token');
  }
}
