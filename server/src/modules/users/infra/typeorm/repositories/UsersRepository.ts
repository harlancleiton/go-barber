import { getRepository, Repository } from 'typeorm';

import { DeepPartial, FindOneOptions } from '~/@types';
import { IUserRepository } from '~/modules/users/repositories';

import { User } from '../entities';

export class UserRepository implements IUserRepository<User> {
  private readonly ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create(partial: DeepPartial<User>): Promise<User> {
    const user = this.ormRepository.create(partial);
    await this.ormRepository.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  merge(mergeIntoEntity: User, ...entityLikes: DeepPartial<User>[]): User {
    return this.ormRepository.merge(mergeIntoEntity, ...entityLikes);
  }

  async find(): Promise<User[]> {
    const users = await this.ormRepository.find();

    this.ormRepository.merge(users[0], { email: '' });

    return users;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  async findOne(options: FindOneOptions<User>): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(options);

    return user;
  }
}
