import faker from 'faker';
import { Factory } from 'fishery';

import { IAppointment } from '~/modules/appointments/domain';

import { userFactory } from './userFactory';

export const appointmentFactory = Factory.define<IAppointment>(() => ({
  id: faker.random.uuid(),
  date: faker.date.future(),
  provider: userFactory.build(),
  createdAt: new Date(),
  updatedAt: new Date()
}));
