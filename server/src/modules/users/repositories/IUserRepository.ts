import { DeepPartial } from '~/@types';

import { IUser } from '../domain';

export interface IUserRepository {
  create(partial: DeepPartial<IUser>): Promise<IUser>;

  save(appointment: IUser): Promise<IUser>;

  findOneByEmail(email: string): Promise<IUser | undefined>;
}
