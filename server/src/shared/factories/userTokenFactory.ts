import faker from 'faker';
import { Factory } from 'fishery';

import { IUserToken, UserTokenType } from '~/modules/users/domain';

import { userFactory } from './userFactory';

export const userTokenFactory = Factory.define<IUserToken>(() => {
  return {
    id: faker.random.uuid(),
    token: faker.random.uuid(),
    type: faker.random.objectElement(
      Object.values(UserTokenType)
    ) as UserTokenType,
    user: userFactory.build(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
});
