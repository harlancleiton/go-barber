import { inject, injectable } from 'tsyringe';

import { Providers } from '~/shared/container';
import { IHashProvider } from '~/shared/container/providers';
import { GoBarberException } from '~/shared/exceptions';

import { IUser } from '../domain';
import { IUserRepository } from '../repositories';

interface ServiceRequest {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject(Providers.USER_REPOSITORY)
    private readonly usersRepository: IUserRepository,
    @inject(Providers.HASH_PROVIDER)
    private readonly hashProvider: IHashProvider
  ) {}

  async execute({
    id,
    firstname,
    lastname,
    email,
    password
  }: ServiceRequest): Promise<IUser> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new GoBarberException('User not found', 404);

    if (user.email !== email) {
      const userWithUpdatedEmail = await this.usersRepository.findOneByEmail(
        email
      );

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id)
        throw new GoBarberException('Email already in use', 422);
    }

    const hashedPassword =
      password && (await this.hashProvider.generate(password));

    this.usersRepository.merge(user, {
      firstname,
      lastname,
      email,
      password: hashedPassword
    });
    await this.usersRepository.save(user);

    return user;
  }
}
