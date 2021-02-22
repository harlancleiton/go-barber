import { DeepPartial } from '~/@types';
import { factories } from '~/shared/factories';

import { IUserToken } from '../../domain';
import { IUserTokensRepository } from '../IUserTokensRepository';

export class FakeUserTokensRepository implements IUserTokensRepository {
  private readonly usersTokens: IUserToken[] = [];

  async save(userToken: IUserToken): Promise<IUserToken> {
    const findIndex = this.usersTokens.findIndex(
      ({ id }) => id === userToken.id
    );

    if (findIndex >= 0) {
      this.usersTokens[findIndex] = userToken;
      return userToken;
    }

    this.usersTokens.push(userToken);
    return userToken;
  }

  async create(partial: DeepPartial<IUserToken>): Promise<IUserToken> {
    const userToken = factories.userToken.build(partial);

    this.usersTokens.push(userToken);

    return userToken;
  }
}
