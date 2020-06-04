import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories';
import { User } from '../models';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const checkUsersExists = await usersRepository.findByEmail(email);

    if (checkUsersExists) throw Error('Email address already used');

    const user = usersRepository.create({ name, email, password });

    await usersRepository.save(user);

    return user;
  }
}
