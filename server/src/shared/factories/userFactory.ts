import faker from 'faker';
import { Factory } from 'fishery';

import { IUser } from '~/modules/users/domain';

export const userFactory = Factory.define<IUser>(() => {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();

  return {
    id: faker.random.uuid(),
    firstname,
    lastname,
    fullname: `${firstname} ${lastname}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatar: faker.internet.url(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
});
