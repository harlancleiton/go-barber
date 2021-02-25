import { FakeHashProvider, IHashProvider } from '~/shared/container/providers';
import { GoBarberException } from '~/shared/exceptions';
import { factories } from '~/shared/factories';

import { IUserRepository } from '../repositories';
import { FakeUsersRepository } from '../repositories/fakes';
import { AuthenticateUserService } from './AuthenticateUserService';

describe('AuthenticateUserService', () => {
  let usersRepository: IUserRepository;
  let hashProvider: IHashProvider;
  let authenticateUserService: AuthenticateUserService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hashProvider
    );
  });

  it('should be able to authenticate', async () => {
    const { email, password } = factories.user.build();

    jest
      .spyOn(usersRepository, 'findOneByEmail')
      .mockImplementation(async () => factories.user.build());

    jest.spyOn(hashProvider, 'compare').mockImplementation(async () => true);

    const { user, token, refreshToken } = await authenticateUserService.execute(
      {
        email,
        password
      }
    );

    expect(user).toBeDefined();
    expect(token).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  it('should not be able to authenticate with non existing user', async () => {
    const { email, password } = factories.user.build();

    jest
      .spyOn(usersRepository, 'findOneByEmail')
      .mockImplementation(async () => undefined);

    expect(
      authenticateUserService.execute({
        email,
        password
      })
    ).rejects.toBeInstanceOf(GoBarberException);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const { email, password } = factories.user.build();

    jest
      .spyOn(usersRepository, 'findOneByEmail')
      .mockImplementation(async () => factories.user.build());

    jest.spyOn(hashProvider, 'compare').mockImplementation(async () => false);

    expect(
      authenticateUserService.execute({
        email,
        password
      })
    ).rejects.toBeInstanceOf(GoBarberException);
  });
});
