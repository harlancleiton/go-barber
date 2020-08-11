import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { authConfig } from '../../../config';
import { GoBarberException } from '../../../shared/exceptions';
import { User } from '../infra/typeorm/entities';
import { IUsersRepository } from '../repositories';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export class AuthenticateUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user)
      throw new GoBarberException('Incorrect email/password combination', 401);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      throw new GoBarberException('Incorrect email/password combination', 401);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
      issuer: 'GoBarber',
    });

    return { user, token };
  }
}
