import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '../../../../../config';
import { GoBarberException } from '../../../../../shared/exceptions';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

interface TokenPayload {
  iat: number;
  exp: number;
  iss: string;
  sub: string;
}

function ensureAutenthicated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new GoBarberException('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret) as TokenPayload;

    request.auth = {
      token: decoded,
      userPrimaryKey: decoded.sub,
      getUser: async () => {
        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(decoded.sub);

        if (!user) throw new GoBarberException('User not found', 404);

        return user;
      },
    };

    return next();
  } catch {
    throw new GoBarberException('Invalid JWT token', 401);
  }
}

export default ensureAutenthicated;
