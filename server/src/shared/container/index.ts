import { container } from 'tsyringe';

import { AppointmentRepository } from '~/modules/appointments/infra/typeorm';
import { IAppointmentRepository } from '~/modules/appointments/repositories';
import { UserRepository } from '~/modules/users/infra/typeorm';
import { UserTokensRepository } from '~/modules/users/infra/typeorm/repositories/UserTokensRepository';
import {
  IUserRepository,
  IUserTokensRepository
} from '~/modules/users/repositories';

import {
  BCryptHashProvider,
  DiskStorageProvider,
  IHashProvider,
  IStorageProvider
} from './providers';

export enum Providers {
  APPOINTMENT_REPOSITORY = 'AppointmentRepository',
  USER_REPOSITORY = 'UserRepository',
  USER_TOKENS_REPOSITORY = 'UserTokensRepository',
  HASH_PROVIDER = 'HashProvider',
  STORAGE_PROVIDER = 'StorageProvider',
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

  container.registerSingleton<IUserTokensRepository>(
    Providers.USER_TOKENS_REPOSITORY,
    UserTokensRepository
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
