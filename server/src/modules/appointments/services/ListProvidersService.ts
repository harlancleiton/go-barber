import { inject, injectable } from 'tsyringe';

import { IUser } from '~/modules/users/domain';
import { IUserRepository } from '~/modules/users/repositories';
import { Providers } from '~/shared/container';

interface ServiceRequest {
  user: IUser;
}

@injectable()
export class ListProvidersService {
  constructor(
    @inject(Providers.USER_REPOSITORY)
    private readonly usersRepository: IUserRepository
  ) {}

  async execute({ user }: ServiceRequest): Promise<IUser[]> {
    const providers = await this.usersRepository.findProviders({
      excludeUser: user
    });

    return providers;
  }
}
