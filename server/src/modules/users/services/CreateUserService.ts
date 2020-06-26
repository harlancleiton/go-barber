import { getCustomRepository } from 'typeorm';

import { GoBarberException } from '../../../shared/exceptions';
import { User } from '../infra/typeorm/entities';
import { UsersRepository } from '../repositories';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const checkUsersExists = await usersRepository.findByEmail(email);

    if (checkUsersExists)
      throw new GoBarberException('Email address already used', 400);

    const user = usersRepository.create({ name, email, password });

    await usersRepository.save(user);

    return user;
  }
}
