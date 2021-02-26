import {
  FakeUsersRepository,
  IUserRepository
} from '~/modules/users/repositories';
import { factories } from '~/shared/factories';

import { ListProvidersService } from './ListProvidersService';

describe('ListProvidersService', () => {
  let usersRepository: IUserRepository;
  let listProvidersService: ListProvidersService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(usersRepository);
  });

  it('should be able show the profile', async () => {
    const user = factories.user.build();

    const providersLength = factories.faker.random.number({ min: 3, max: 100 });

    jest
      .spyOn(usersRepository, 'findProviders')
      .mockImplementation(async () =>
        factories.user.buildList(providersLength)
      );

    const providers = await listProvidersService.execute({ user });

    expect(providers).toBeDefined();
    expect(providers.length).toEqual(providersLength);

    expect(usersRepository.findProviders).toBeCalledWith({
      excludeUser: user
    });
  });
});
