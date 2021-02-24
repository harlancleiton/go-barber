import { isBefore, subHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { appConfig } from '~/config/app';
import { Providers } from '~/shared/container';
import { IHashProvider } from '~/shared/container/providers';
import { GoBarberException } from '~/shared/exceptions';

import { UserTokenType } from '../domain';
import { IUserRepository, IUserTokensRepository } from '../repositories';

interface ServiceRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordService {
  constructor(
    @inject(Providers.USER_REPOSITORY)
    private readonly usersRepository: IUserRepository,
    @inject(Providers.USER_TOKENS_REPOSITORY)
    private readonly userTokensRepository: IUserTokensRepository,
    @inject(Providers.HASH_PROVIDER)
    private readonly hashProvider: IHashProvider
  ) {}

  async execute({ token: rawToken, password }: ServiceRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findOne({
      where: {
        type: UserTokenType.FORGOT_PASSWORD,
        token: rawToken
      },
      relations: ['user']
    });

    if (!userToken)
      throw new GoBarberException('User token does not exists', 404);
    if (!userToken.user)
      throw new GoBarberException('User does not exists', 404);

    const expiresIn = subHours(
      new Date(),
      appConfig.forgotPasswordTokenExpiresIn
    );

    if (isBefore(userToken.createdAt, expiresIn)) {
      await this.userTokensRepository.remove(userToken);
      throw new GoBarberException('Token expired', 422);
    }

    const hashedPassword = await this.hashProvider.generate(password);

    const { user } = userToken;
    user.password = hashedPassword;
    await this.usersRepository.save(user);

    await this.userTokensRepository.remove(userToken);
  }
}
