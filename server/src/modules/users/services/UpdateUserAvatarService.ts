import { inject, injectable } from 'tsyringe';

import { Providers } from '~/shared/container';
import { IStorageProvider } from '~/shared/container/providers';

import { IUser } from '../domain';
import { IUserRepository } from '../repositories';

interface ServiceRequest {
  user: IUser;
  avatar: { filename: string };
}

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject(Providers.USER_REPOSITORY)
    private readonly usersRepository: IUserRepository,
    @inject(Providers.STORAGE_PROVIDER)
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute({ avatar, user }: ServiceRequest): Promise<void> {
    if (user.avatar) await this.storageProvider.delete(user.avatar);

    const avatarFilename = await this.storageProvider.save(avatar.filename);
    user.avatar = avatarFilename;
    await this.usersRepository.save(user);
  }
}
