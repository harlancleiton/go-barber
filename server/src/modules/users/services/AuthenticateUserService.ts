import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { authConfig } from '~/config/auth';
import { User, UsersRepository } from '~/modules/users/infra/typeorm';
import { GoBarberException } from '~/shared/exceptions/GoBarberException';

interface ServiceRequest {
  email: string;
  password: string;
}

interface ServiceResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export class AuthenticateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email, password }: ServiceRequest): Promise<ServiceResponse> {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user)
      throw new GoBarberException('Incorrect email/password combination', 401);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      throw new GoBarberException('Incorrect email/password combination', 401);

    const { secret, ...signOptions } = authConfig.jwt.options;

    const token = sign({}, authConfig.jwt.options.secret, {
      subject: String(user[authConfig.jwt.uid]),
      ...signOptions
    });

    return { user, token, refreshToken: '' };
  }
}
