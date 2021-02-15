import faker from 'faker';

import { appointmentFactory } from './appointmentFactory';
import { userFactory } from './userFactory';

export const factories = {
  faker,
  appointment: appointmentFactory,
  user: userFactory
};
