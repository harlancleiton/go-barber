import { FakeMailProvider } from '~/shared/container/providers/fakes';
import { MailProvider } from '~/shared/container/providers/MailProvider';
import { GoBarberException } from '~/shared/exceptions';
import { factories } from '~/shared/factories';

import { UserTokenType } from '../domain';
import {
  FakeUsersRepository,
  FakeUserTokensRepository,
  IUserRepository,
  IUserTokensRepository
} from '../repositories';
import { ForgotPasswordService } from './ForgotPasswordService';

describe('ForgotPasswordService', () => {
  let usersRepository: IUserRepository;
  let userTokensRepository: IUserTokensRepository;
  let mailProvider: MailProvider;
  let forgotPasswordService: ForgotPasswordService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    userTokensRepository = new FakeUserTokensRepository();
    mailProvider = new FakeMailProvider();

    forgotPasswordService = new ForgotPasswordService(
      usersRepository,
      userTokensRepository,
      mailProvider
    );
  });

  it('should be able to recover the password using the email', async () => {
    const user = factories.user.build();

    jest
      .spyOn(usersRepository, 'findOneByEmail')
      .mockImplementation(async () => user);
    const spySendMail = jest.spyOn(mailProvider, 'sendMail');

    await forgotPasswordService.execute({ email: user.email });

    expect(usersRepository.findOneByEmail).toBeCalledWith(user.email);
    expect(spySendMail).toBeCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    jest
      .spyOn(usersRepository, 'findOneByEmail')
      .mockImplementation(async () => undefined);
    const spySendMail = jest.spyOn(mailProvider, 'sendMail');

    const email = factories.faker.internet.email();

    await expect(
      forgotPasswordService.execute({ email })
    ).rejects.toBeInstanceOf(GoBarberException);

    expect(usersRepository.findOneByEmail).toBeCalledWith(email);
    expect(spySendMail).not.toBeCalled();
  });

  it('should be generate a forgot password token', async () => {
    const user = factories.user.build();

    jest
      .spyOn(usersRepository, 'findOneByEmail')
      .mockImplementation(async () => user);
    const spyCreateUserToken = jest.spyOn(userTokensRepository, 'create');

    await forgotPasswordService.execute({ email: user.email });

    expect(usersRepository.findOneByEmail).toBeCalledWith(user.email);
    expect(spyCreateUserToken).toBeCalledWith({
      type: UserTokenType.FORGOT_PASSWORD,
      user: expect.objectContaining({ id: user.id })
    });
  });
});
