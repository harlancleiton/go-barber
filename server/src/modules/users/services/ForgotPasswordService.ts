import { inject, injectable } from 'tsyringe';

import { Providers } from '~/shared/container';
import { MailProvider } from '~/shared/container/providers/MailProvider';
import { GoBarberException } from '~/shared/exceptions';

import { UserTokenType } from '../domain';
import { IUserRepository, IUserTokensRepository } from '../repositories';

interface ServiceRequest {
  email: string;
}

@injectable()
export class ForgotPasswordService {
  constructor(
    @inject(Providers.USER_REPOSITORY)
    private readonly usersRepository: IUserRepository,
    @inject(Providers.USER_TOKENS_REPOSITORY)
    private readonly userTokensRepository: IUserTokensRepository,
    @inject(Providers.MAIL_PROVIDER)
    private readonly mailProvider: MailProvider
  ) {}

  async execute({ email }: ServiceRequest): Promise<void> {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) throw new GoBarberException('User not found', 404);

    const token = await this.userTokensRepository.create({
      type: UserTokenType.FORGOT_PASSWORD,
      user
    });

    await this.mailProvider.sendMail(user, { context: { token } });
  }
}
