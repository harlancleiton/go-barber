import { hash } from 'bcryptjs';

import { CreateUserDto } from '~/modules/users/dtos/CreateUserDto';
import { User, UsersRepository } from '~/modules/users/infra/typeorm';
import { GoBarberException } from '~/shared/exceptions';

export class CreateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({
    firstname,
    lastname,
    email,
    password
  }: CreateUserDto): Promise<User> {
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
