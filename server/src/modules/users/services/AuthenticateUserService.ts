import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '~/config/auth';
import { Providers } from '~/shared/container';
import { GoBarberException } from '~/shared/exceptions/GoBarberException';
import { IHashProvider } from '~/shared/providers';

import { IUser } from '../domain';
import { IUserRepository } from '../repositories';

interface ServiceRequest {
  email: string;
  password: string;
}

interface ServiceResponse {
  user: IUser;
  token: string;
  refreshToken: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject(Providers.USER_REPOSITORY)
    private readonly usersRepository: IUserRepository,
    @inject(Providers.HASH_PROVIDER)
    private readonly hashProvider: IHashProvider
  ) {}

  async execute({ email, password }: ServiceRequest): Promise<ServiceResponse> {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user)
      throw new GoBarberException('Incorrect email/password combination', 401);

    const passwordMatched = await this.hashProvider.compare(
      password,
      user.password
    );

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
