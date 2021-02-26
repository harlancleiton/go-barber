import { GoBarberException } from '~/shared/exceptions';
import { factories } from '~/shared/factories';

import { IUserRepository } from '../repositories';
import { FakeUsersRepository } from '../repositories/fakes';
import { FindProfileService } from './FindProfileService';

describe('UpdateUserService', () => {
  let usersRepository: IUserRepository;
  let findProfileService: FindProfileService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    findProfileService = new FindProfileService(usersRepository);
  });

  it('should be able show the profile', async () => {
    const user = factories.user.build();
    const { id, firstname, lastname, email } = user;

    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => user);

    const profile = await findProfileService.execute({ user });

    expect(profile).toBeDefined();
    expect(profile).toMatchObject(
      expect.objectContaining({ id, firstname, lastname, email })
    );

    expect(usersRepository.findOne).toBeCalledWith({ where: { id: user.id } });
  });

  it('should not be able show the profile from non-existing user', async () => {
    const user = factories.user.build();

    jest
      .spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => undefined);

    await expect(findProfileService.execute({ user })).rejects.toBeInstanceOf(
      GoBarberException
    );

    expect(usersRepository.findOne).toBeCalledWith({ where: { id: user.id } });
  });
});
