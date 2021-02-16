import { GoBarberException } from '~/shared/exceptions';
import { factories } from '~/shared/factories';

import { FakeUsersRepository } from '../repositories/fakes';
import { CreateUserService } from './CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const { firstname, lastname, email, password } = factories.user.build();

    const usersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUserService(usersRepository);

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

    const usersRepository = new FakeUsersRepository();
    const createUsersService = new CreateUserService(usersRepository);

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
