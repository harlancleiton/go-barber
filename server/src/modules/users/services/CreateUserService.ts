import { GoBarberException } from '../../../shared/exceptions';
import { User } from '../infra/typeorm/entities';
import { IUsersRepository } from '../repositories';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (checkUsersExists)
      throw new GoBarberException('Email address already used', 400);

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}
