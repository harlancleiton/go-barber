import { subHours } from 'date-fns';

import { appConfig } from '~/config/app';
import { FakeHashProvider, IHashProvider } from '~/shared/container/providers';
import { GoBarberException } from '~/shared/exceptions';
import { factories } from '~/shared/factories';

import { UserTokenType } from '../domain';
import {
  FakeUsersRepository,
  FakeUserTokensRepository,
  IUserRepository,
  IUserTokensRepository
} from '../repositories';
import { ResetPasswordService } from './ResetPasswordService';

describe('ResetPasswordService', () => {
  let usersRepository: IUserRepository;
  let userTokensRepository: IUserTokensRepository;
  let hashProvider: IHashProvider;
  let resetPasswordService: ResetPasswordService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    userTokensRepository = new FakeUserTokensRepository();
    hashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      usersRepository,
      userTokensRepository,
      hashProvider
    );
  });

  it('should be able to reset the password', async () => {
    const userToken = factories.userToken.build({
      type: UserTokenType.FORGOT_PASSWORD
    });
    const password = factories.faker.internet.password();

    jest
      .spyOn(userTokensRepository, 'findOne')
      .mockImplementation(async () => userToken);
    jest.spyOn(usersRepository, 'save');
    jest
      .spyOn(hashProvider, 'generate')
      .mockImplementation(async () => password);

    await resetPasswordService.execute({ token: userToken.token, password });

    expect(userTokensRepository.findOne).toBeCalledWith({
      where: {
        type: userToken.type,
        token: userToken.token
      },
      relations: ['user']
    });

    expect(hashProvider.generate).toBeCalledWith(password);

    expect(usersRepository.save).toBeCalledWith(
      expect.objectContaining({ password })
    );
  });

  it('should be delete token after reset password', async () => {
    const userToken = factories.userToken.build({
      type: UserTokenType.FORGOT_PASSWORD
    });
    const password = factories.faker.internet.password();

    jest
      .spyOn(userTokensRepository, 'findOne')
      .mockImplementation(async () => userToken);
    jest.spyOn(userTokensRepository, 'remove');
    jest
      .spyOn(hashProvider, 'generate')
      .mockImplementation(async () => password);

    await resetPasswordService.execute({ token: userToken.token, password });

    expect(userTokensRepository.remove).toBeCalledWith(userToken);
  });

  it('should not be able to reset password with non-existing token', async () => {
    const userToken = factories.userToken.build({
      type: UserTokenType.FORGOT_PASSWORD
    });
    const password = factories.faker.internet.password();

    jest
      .spyOn(userTokensRepository, 'findOne')
      .mockImplementation(async () => undefined);

    await expect(
      resetPasswordService.execute({ token: userToken.token, password })
    ).rejects.toBeInstanceOf(GoBarberException);
  });

  it('should not be able to reset password with non-existing user', async () => {
    const userToken = factories.userToken.build({
      type: UserTokenType.FORGOT_PASSWORD
    });
    const password = factories.faker.internet.password();

    // @ts-ignore
    delete userToken.user;

    jest
      .spyOn(userTokensRepository, 'findOne')
      .mockImplementation(async () => userToken);

    await expect(
      resetPasswordService.execute({ token: userToken.token, password })
    ).rejects.toBeInstanceOf(GoBarberException);
  });

  it('should not be able to reset password if token is expired', async () => {
    const userToken = factories.userToken.build({
      type: UserTokenType.FORGOT_PASSWORD,
      createdAt: subHours(new Date(), appConfig.forgotPasswordTokenExpiresIn)
    });
    const password = factories.faker.internet.password();

    jest
      .spyOn(userTokensRepository, 'findOne')
      .mockImplementation(async () => userToken);
    jest.spyOn(usersRepository, 'save');
    jest.spyOn(hashProvider, 'generate');

    await expect(
      resetPasswordService.execute({ token: userToken.token, password })
    ).rejects.toBeInstanceOf(GoBarberException);

    expect(hashProvider.generate).not.toBeCalled();
    expect(usersRepository.save).not.toBeCalled();
  });

  it('should be delete token if already expired', async () => {
    const userToken = factories.userToken.build({
      type: UserTokenType.FORGOT_PASSWORD,
      createdAt: subHours(new Date(), appConfig.forgotPasswordTokenExpiresIn)
    });
    const password = factories.faker.internet.password();

    jest
      .spyOn(userTokensRepository, 'findOne')
      .mockImplementation(async () => userToken);
    jest.spyOn(userTokensRepository, 'remove');

    await expect(
      resetPasswordService.execute({ token: userToken.token, password })
    ).rejects.toBeInstanceOf(GoBarberException);

    expect(userTokensRepository.remove).toBeCalledWith(userToken);
  });
});
