import { container } from 'tsyringe';

import {
  AppointmentsRepository,
  IAppointmentsRepository,
} from '../../modules/appoitments';
import { IUsersRepository } from '../../modules/users';
import { UsersRepository } from '../../modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppoitmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
