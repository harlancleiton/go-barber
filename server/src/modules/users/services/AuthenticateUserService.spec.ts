const mockedCompare = jest.fn();

jest.mock('bcryptjs', () => ({
  compare: mockedCompare
}));

import { GoBarberException } from '~/shared/exceptions';
import { factories } from '~/shared/factories';

import { FakeUsersRepository } from '../repositories/fakes';
import { AuthenticateUserService } from './AuthenticateUserService';

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const { email, password } = factories.user.build();

    const usersRepository = new FakeUsersRepository();
    const authenticateUserService = new AuthenticateUserService(
      usersRepository
    );

    jest
      .spyOn(usersRepository, 'findOneByEmail')
      .mockImplementation(async () => factories.user.build());

    mockedCompare.mockResolvedValue(Promise.resolve(true));

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

    const usersRepository = new FakeUsersRepository();
    const authenticateUserService = new AuthenticateUserService(
      usersRepository
    );

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

    const usersRepository = new FakeUsersRepository();
    const authenticateUserService = new AuthenticateUserService(
      usersRepository
    );

    jest
      .spyOn(usersRepository, 'findOneByEmail')
      .mockImplementation(async () => factories.user.build());

    mockedCompare.mockResolvedValue(Promise.resolve(false));

    expect(
      authenticateUserService.execute({
        email,
        password
      })
    ).rejects.toBeInstanceOf(GoBarberException);
  });
});
