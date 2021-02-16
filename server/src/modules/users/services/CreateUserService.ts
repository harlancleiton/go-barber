import { inject, injectable } from 'tsyringe';

import { IUser } from '~/modules/users/domain';
import { CreateUserDto } from '~/modules/users/dtos/CreateUserDto';
import { Providers } from '~/shared/container';
import { GoBarberException } from '~/shared/exceptions';
import { IHashProvider } from '~/shared/providers';

import { IUserRepository } from '../repositories';

@injectable()
export class CreateUserService {
  constructor(
    @inject(Providers.USER_REPOSITORY)
    private readonly usersRepository: IUserRepository,
    @inject(Providers.HASH_PROVIDER)
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute({
    firstname,
    lastname,
    email,
    password
  }: CreateUserDto): Promise<IUser> {
    const findUserEmail = await this.usersRepository.findOneByEmail(email);

    if (findUserEmail)
      throw new GoBarberException('Email address already used', 400);

    const hashedPassword = await this.hashProvider.generate(password);

    const user = await this.usersRepository.create({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    // @ts-ignore
    delete user.password;

    return user;
  }
}
