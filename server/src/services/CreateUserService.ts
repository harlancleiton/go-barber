import { hash } from 'bcryptjs';

import { CreateUserDto } from '~/dtos/CreateUserDto';
import { User } from '~/entities/User';
import { UsersRepository } from '~/repositories/UsersRepository';

export class CreateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({
    firstname,
    lastname,
    email,
    password
  }: CreateUserDto): Promise<User> {
    const findUserEmail = await this.usersRepository.findOneByEmail(email);

    if (findUserEmail) throw new Error('Email address already used');

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
