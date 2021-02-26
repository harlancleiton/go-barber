import { inject, injectable } from 'tsyringe';

import { Providers } from '~/shared/container';
import { GoBarberException } from '~/shared/exceptions';

import { IUser } from '../domain';
import { IUserRepository } from '../repositories';

interface ServiceRequest {
  user: IUser;
}

@injectable()
export class FindProfileService {
  constructor(
    @inject(Providers.USER_REPOSITORY)
    private readonly usersRepository: IUserRepository
  ) {}

  async execute({ user }: ServiceRequest): Promise<IUser> {
    const profile = await this.usersRepository.findOne({
      where: { id: user.id }
    });

    if (!profile) throw new GoBarberException('User not found', 404);

    return profile;
  }
}
