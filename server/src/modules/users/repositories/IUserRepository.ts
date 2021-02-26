import { DeepPartial, FindOneOptions } from '~/@types';

import { IUser } from '../domain';
import { FindProvidersDto } from '../dtos';

export interface IUserRepository<T = IUser> {
  create(partial: DeepPartial<T>): Promise<T>;

  save(appointment: T): Promise<T>;

  merge(mergeIntoEntity: T, ...entityLikes: DeepPartial<T>[]): T;

  findOneByEmail(email: string): Promise<T | undefined>;

  findOne(options: FindOneOptions<T>): Promise<T | undefined>;

  findProviders({ excludeUser }: FindProvidersDto): Promise<T[]>;
}
