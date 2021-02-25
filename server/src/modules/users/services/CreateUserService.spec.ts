import { FakeHashProvider, IHashProvider } from '~/shared/container/providers';
import { GoBarberException } from '~/shared/exceptions';
import { factories } from '~/shared/factories';

import { IUserRepository } from '../repositories';
import { FakeUsersRepository } from '../repositories/fakes';
import { CreateUserService } from './CreateUserService';

describe('CreateUserService', () => {
  let usersRepository: IUserRepository;
  let hashProvider: IHashProvider;
  let createUsersService: CreateUserService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUsersService = new CreateUserService(usersRepository, hashProvider);
  });

  it('should be able to create a new user', async () => {
    const { firstname, lastname, email, password } = factories.user.build();

    const user = await createUsersService.execute({
      firstname,
      lastname,
      email,
      password
    });

    expect(user).toBeDefined();
    expect(user).toMatchObject({ firstname, lastname, email });
  });

  it('should not be able to create a new user with same email from another', async () => {
    const { firstname, lastname, email, password } = factories.user.build();

    jest
      .spyOn(usersRepository, 'findOneByEmail')
      .mockImplementation(async () => factories.user.build());

    expect(
      createUsersService.execute({
        firstname,
        lastname,
        email,
        password
      })
    ).rejects.toBeInstanceOf(GoBarberException);
  });
});
