import { hash } from 'bcryptjs';

import { IUser } from '~/modules/users/domain';
import { CreateUserDto } from '~/modules/users/dtos/CreateUserDto';
import { GoBarberException } from '~/shared/exceptions';

import { IUserRepository } from '../repositories';

export class CreateUserService {
  constructor(private readonly usersRepository: IUserRepository) {}

  public async execute({
    firstname,
    lastname,
    email,
    password
  }: CreateUserDto): Promise<IUser> {
    const findUserEmail = await this.usersRepository.findOneByEmail(email);

    if (findUserEmail)
      throw new GoBarberException('Email address already used', 400);

    const hashedPassword = await hash(password, 10);

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
