import faker from 'faker';

import { appointmentFactory } from './appointmentFactory';
import { userFactory } from './userFactory';
import { userTokenFactory } from './userTokenFactory';

export const factories = {
  faker,
  appointment: appointmentFactory,
  user: userFactory,
  userToken: userTokenFactory
};
