import { IStorageProvider } from '~/shared/container/providers';
import { FakeStorageProvider } from '~/shared/container/providers/fakes/FakeStorageProvider';
import { factories } from '~/shared/factories';

import { IUserRepository } from '../repositories';
import { FakeUsersRepository } from '../repositories/fakes';
import { UpdateUserAvatarService } from './UpdateUserAvatarService';

describe('UpdateUserAvatarService', () => {
  let usersRepository: IUserRepository;
  let storageProvider: IStorageProvider;
  let updateUserAvatarService: UpdateUserAvatarService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    storageProvider = new FakeStorageProvider();
    updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository,
      storageProvider
    );
  });

  it('should be able to update a user avatar', async () => {
    const user = factories.user.build({ avatar: null });
    const avatar = { filename: factories.faker.system.fileName() };

    jest.spyOn(usersRepository, 'save').mockImplementation(jest.fn());
    jest
      .spyOn(storageProvider, 'save')
      .mockImplementation(async () => avatar.filename);

    await updateUserAvatarService.execute({ user, avatar });

    expect(storageProvider.save).toBeCalledWith(avatar.filename);
    expect(usersRepository.save).toBeCalledWith(
      expect.objectContaining({ avatar: avatar.filename })
    );
  });

  it('should delete old avatar when updating new one', async () => {
    const user = factories.user.build();
    const oldAvatar = user.avatar;
    const avatar = { filename: factories.faker.system.fileName() };

    jest.spyOn(usersRepository, 'save').mockImplementation(jest.fn());
    jest.spyOn(storageProvider, 'delete').mockImplementation(jest.fn());
    jest
      .spyOn(storageProvider, 'save')
      .mockImplementation(async () => avatar.filename);

    await updateUserAvatarService.execute({ user, avatar });

    expect(storageProvider.delete).toBeCalledWith(oldAvatar);
    expect(storageProvider.save).toBeCalledWith(avatar.filename);
    expect(usersRepository.save).toBeCalledWith(
      expect.objectContaining({ avatar: avatar.filename })
    );
  });
});
