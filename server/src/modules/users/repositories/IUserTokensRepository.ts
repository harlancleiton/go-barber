import { DeepPartial, FindOneOptions } from '~/@types';

import { IUserToken } from '../domain';

export interface IUserTokensRepository {
  create(partial: DeepPartial<IUserToken>): Promise<IUserToken>;

  save(userToken: IUserToken): Promise<IUserToken>;

  remove(userTokens: IUserToken[]): Promise<IUserToken[]>;

  remove(userToken: IUserToken): Promise<IUserToken>;

  findOne(options: FindOneOptions<IUserToken>): Promise<IUserToken | undefined>;
}
