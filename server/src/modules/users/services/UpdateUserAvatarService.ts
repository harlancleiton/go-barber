import fs from 'fs';
import { join } from 'path';
import { inject, injectable } from 'tsyringe';

import { uploadConfig } from '~/config/upload';
import { Providers } from '~/shared/container';

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
    private readonly usersRepository: IUserRepository
  ) {}

  async execute({ avatar, user }: ServiceRequest): Promise<void> {
    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatar.filename;
    await this.usersRepository.save(user);
  }
}
