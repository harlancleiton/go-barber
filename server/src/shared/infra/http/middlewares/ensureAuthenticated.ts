import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import { auth } from '../../../../config';
import { UsersRepository, User } from '../../../../modules/users';
import { GoBarberException } from '../../../exceptions';

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
    const decoded = verify(token, auth.jwt.secret) as TokenPayload;

    request.auth = {
      token: decoded,
      userPrimaryKey: decoded.sub,
      getUser: async (): Promise<User> => {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOneOrFail(decoded.sub);

        return user;
      },
    };

    return next();
  } catch {
    throw new GoBarberException('Invalid JWT token', 401);
  }
}

export default ensureAutenthicated;
