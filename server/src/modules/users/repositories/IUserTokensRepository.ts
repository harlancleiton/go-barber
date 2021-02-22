import { DeepPartial } from '~/@types';

import { IUserToken } from '../domain';

export interface IUserTokensRepository {
  create(partial: DeepPartial<IUserToken>): Promise<IUserToken>;

  save(userToken: IUserToken): Promise<IUserToken>;
}
