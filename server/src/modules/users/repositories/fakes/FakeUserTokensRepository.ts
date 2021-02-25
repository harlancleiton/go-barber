import { DeepPartial, FindOneOptions } from '~/@types';
import { factories } from '~/shared/factories';

import { IUserToken } from '../../domain';
import { IUserTokensRepository } from '../IUserTokensRepository';

export class FakeUserTokensRepository implements IUserTokensRepository {
  private readonly userTokens: IUserToken[] = [];

  async save(userToken: IUserToken): Promise<IUserToken> {
    const findIndex = this.userTokens.findIndex(
      ({ id }) => id === userToken.id
    );

    if (findIndex >= 0) {
      this.userTokens[findIndex] = userToken;
      return userToken;
    }

    this.userTokens.push(userToken);
    return userToken;
  }

  async create(partial: DeepPartial<IUserToken>): Promise<IUserToken> {
    const userToken = factories.userToken.build(partial);

    this.userTokens.push(userToken);

    return userToken;
  }

  async findOne(
    options: FindOneOptions<IUserToken>
  ): Promise<IUserToken | undefined> {
    return factories.userToken.build(options.where);
  }

  remove(userTokens: IUserToken[]): Promise<IUserToken[]>;
  remove(userToken: IUserToken): Promise<IUserToken>;
  async remove(
    userTokens: IUserToken | IUserToken[]
  ): Promise<IUserToken | IUserToken[]> {
    if (Array.isArray(userTokens)) return userTokens;

    const findIndex = this.userTokens.findIndex(
      ({ id }) => id === userTokens.id
    );

    if (findIndex < 0) return factories.userToken.build();

    const token = this.userTokens[findIndex];

    this.userTokens.splice(findIndex, 1);

    return token;
  }
}
