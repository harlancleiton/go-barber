import { DeepPartial, FindOneOptions } from '~/@types';

import { IUser } from '../domain';

export interface IUserRepository<T = IUser> {
  create(partial: DeepPartial<T>): Promise<T>;

  save(appointment: T): Promise<T>;

  merge(mergeIntoEntity: T, ...entityLikes: DeepPartial<T>[]): T;

  findOneByEmail(email: string): Promise<T | undefined>;

  findOne(options: FindOneOptions<T>): Promise<T | undefined>;
}
