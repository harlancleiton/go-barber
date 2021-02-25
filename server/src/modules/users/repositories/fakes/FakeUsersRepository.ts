import { DeepPartial, FindOneOptions } from '~/@types';
import { factories } from '~/shared/factories';

import { IUser } from '../../domain';
import { IUserRepository } from '../IUserRepository';

export class FakeUsersRepository implements IUserRepository {
  private readonly users: IUser[] = [];

  async save(user: IUser): Promise<IUser> {
    const findIndex = this.users.findIndex(({ id }) => id === user.id);

    if (findIndex >= 0) {
      this.users[findIndex] = user;
      return user;
    }

    this.users.push(user);
    return user;
  }

  async create(partial: DeepPartial<IUser>): Promise<IUser> {
    const user = factories.user.build(partial);

    this.users.push(user);

    return user;
  }

  async find(): Promise<IUser[]> {
    return this.users;
  }

  async findOneByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async findOne(options: FindOneOptions<IUser>): Promise<IUser | undefined> {
    return factories.user.build(options.where);
  }
}
