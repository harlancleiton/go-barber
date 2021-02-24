import { getRepository, Repository } from 'typeorm';

import { DeepPartial, FindOneOptions } from '~/@types';
import { IUserTokensRepository } from '~/modules/users/repositories';

import { UserToken } from '../entities';

export class UserTokensRepository implements IUserTokensRepository {
  private readonly ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  async create(partial: DeepPartial<UserToken>): Promise<UserToken> {
    const userToken = this.ormRepository.create(partial);
    await this.ormRepository.save(userToken);

    return userToken;
  }

  async save(userToken: UserToken): Promise<UserToken> {
    return await this.ormRepository.save(userToken);
  }

  remove(userTokens: UserToken[]): Promise<UserToken[]>;
  remove(userToken: UserToken): Promise<UserToken>;
  async remove(
    userTokens: UserToken | UserToken[]
  ): Promise<UserToken | UserToken[]> {
    if (Array.isArray(userTokens))
      return await this.ormRepository.remove(userTokens);

    return await this.ormRepository.remove(userTokens);
  }

  async findOne(
    options: FindOneOptions<UserToken>
  ): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne(options);
    return userToken;
  }
}
