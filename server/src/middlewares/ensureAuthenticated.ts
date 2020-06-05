import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import { auth } from '../config';
import { User } from '../models';
import { UsersRepository } from '../repositories';

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

  if (!authHeader) throw Error('JWT token is missing');

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
    throw Error('Invalid JWT token');
  }
}

export default ensureAutenthicated;
