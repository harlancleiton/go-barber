import { FakeHashProvider, IHashProvider } from '~/shared/container/providers';
import { GoBarberException } from '~/shared/exceptions';
import { factories } from '~/shared/factories';

import { IUserRepository } from '../repositories';
import { FakeUsersRepository } from '../repositories/fakes';
import { UpdateUserService } from './UpdateUserService';

describe('UpdateUserService', () => {
  let usersRepository: IUserRepository;
  let hashProvider: IHashProvider;
  let updateUserService: UpdateUserService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    updateUserService = new UpdateUserService(usersRepository, hashProvider);
  });

  it('should be able to update a user', async () => {
    const user = factories.user.build();

    const { firstname, lastname, email } = factories.user.build();

    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => user);
    jest.spyOn(usersRepository, 'merge');
    jest.spyOn(usersRepository, 'save');

    const updatedUser = await updateUserService.execute({
      id: user.id,
      firstname,
      lastname,
      email
    });

    expect(updatedUser).toBeDefined();
    expect(updatedUser).toMatchObject(
      expect.objectContaining({ firstname, lastname, email })
    );

    expect(usersRepository.findOne).toBeCalledWith({ where: { id: user.id } });
    expect(usersRepository.merge).toBeCalledWith(user, {
      firstname,
      lastname,
      email
    });
    expect(usersRepository.save).toBeCalled();
  });

  it('should not be able to change to another user email', async () => {
    const user = factories.user.build();
    const anotherUser = factories.user.build();

    const { firstname, lastname, password } = factories.user.build();

    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => user);
    jest
      .spyOn(usersRepository, 'findOneByEmail')
      .mockImplementation(async () => anotherUser);
    jest.spyOn(usersRepository, 'merge');
    jest.spyOn(usersRepository, 'save');

    await expect(
      updateUserService.execute({
        id: user.id,
        firstname,
        lastname,
        email: anotherUser.email,
        password
      })
    ).rejects.toBeInstanceOf(GoBarberException);

    expect(usersRepository.findOne).toBeCalledWith({ where: { id: user.id } });
    expect(usersRepository.findOneByEmail).toBeCalledWith(anotherUser.email);
    expect(usersRepository.merge).not.toBeCalled();
    expect(usersRepository.save).not.toBeCalled();
  });

  it('should be able to update the password', async () => {
    const user = factories.user.build();

    const { firstname, lastname, email, password } = factories.user.build();

    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => user);
    jest.spyOn(usersRepository, 'merge');
    jest.spyOn(usersRepository, 'save');

    jest
      .spyOn(hashProvider, 'generate')
      .mockImplementation(async () => password);

    const updatedUser = await updateUserService.execute({
      id: user.id,
      firstname,
      lastname,
      email,
      password
    });

    expect(updatedUser).toBeDefined();
    expect(hashProvider.generate).toBeCalledWith(password);
    expect(usersRepository.merge).toBeCalledWith(
      user,
      expect.objectContaining({ password })
    );
    expect(usersRepository.save).toBeCalled();
  });

  it('should not be able to update a non-existing user', async () => {
    const user = factories.user.build();

    const { firstname, lastname, email } = factories.user.build();

    jest
      .spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => undefined);
    jest.spyOn(usersRepository, 'merge');
    jest.spyOn(usersRepository, 'save');

    await expect(
      updateUserService.execute({
        id: user.id,
        firstname,
        lastname,
        email
      })
    ).rejects.toBeInstanceOf(GoBarberException);

    expect(usersRepository.findOne).toBeCalledWith({ where: { id: user.id } });
    expect(usersRepository.merge).not.toBeCalled();
    expect(usersRepository.save).not.toBeCalled();
  });
});
