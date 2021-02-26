import { DeepPartial, FindOneOptions } from '~/@types';
import { factories } from '~/shared/factories';

import { IUser } from '../../domain';
import { FindProvidersDto } from '../../dtos';
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

  merge(mergeIntoEntity: IUser, ...entityLikes: DeepPartial<IUser>[]): IUser {
    const user = factories.user.build(
      Object.assign(mergeIntoEntity, ...entityLikes)
    );
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

  async findProviders({ excludeUser }: FindProvidersDto): Promise<IUser[]> {
    if (!excludeUser) return this.users;

    return this.users.filter(user => user.id !== excludeUser.id);
  }
}
