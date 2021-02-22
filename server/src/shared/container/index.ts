import { container } from 'tsyringe';

import { AppointmentRepository } from '~/modules/appointments/infra/typeorm';
import { IAppointmentRepository } from '~/modules/appointments/repositories';
import { UserRepository } from '~/modules/users/infra/typeorm';
import { IUserRepository } from '~/modules/users/repositories';

import {
  BCryptHashProvider,
  DiskStorageProvider,
  IHashProvider,
  IStorageProvider
} from './providers';

export enum Providers {
  APPOINTMENT_REPOSITORY = 'IAppointmentRepository',
  USER_REPOSITORY = 'IUserRepository',
  USER_TOKENS_REPOSITORY = 'IUserTokensRepository',
  HASH_PROVIDER = 'IHashProvider',
  STORAGE_PROVIDER = 'IStorageProvider',
  MAIL_PROVIDER = 'MailProvider'
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

  container.registerSingleton<IHashProvider>(
    Providers.HASH_PROVIDER,
    BCryptHashProvider
  );

  container.registerSingleton<IStorageProvider>(
    Providers.STORAGE_PROVIDER,
    DiskStorageProvider
  );
}
