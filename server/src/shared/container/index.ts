import { container } from 'tsyringe';

import { AppointmentRepository } from '~/modules/appointments/infra/typeorm';
import { IAppointmentRepository } from '~/modules/appointments/repositories';
import { UserRepository } from '~/modules/users/infra/typeorm';
import { IUserRepository } from '~/modules/users/repositories';

export enum Providers {
  APPOINTMENT_REPOSITORY = 'IAppointmentRepository',
  USER_REPOSITORY = 'IUserRepository'
}

export function registerProviders(): void {
  container.registerSingleton<IAppointmentRepository>(
    Providers.APPOINTMENT_REPOSITORY,
    AppointmentRepository
  );

  container.registerSingleton<IUserRepository>(
    Providers.USER_REPOSITORY,
    UserRepository
  );
}
