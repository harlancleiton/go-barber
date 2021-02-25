import { container } from 'tsyringe';

import { AppointmentRepository } from '~/modules/appointments/infra/typeorm';
import { IAppointmentRepository } from '~/modules/appointments/repositories';
import {
  UserRepository,
  UserTokensRepository
} from '~/modules/users/infra/typeorm';
import {
  IUserRepository,
  IUserTokensRepository
} from '~/modules/users/repositories';

import {
  BCryptHashProvider,
  DiskStorageProvider,
  EtherealMailProvider,
  IHashProvider,
  IStorageProvider,
  MailProvider
} from './providers';
import { HandlebarsMailTemplateProvider } from './providers/implementations/HandlebarsMailTemplateProvider';
import { MailTemplateProvider } from './providers/MailTemplateProvider';

export enum Providers {
  APPOINTMENT_REPOSITORY = 'AppointmentRepository',
  USER_REPOSITORY = 'UserRepository',
  USER_TOKENS_REPOSITORY = 'UserTokensRepository',
  HASH_PROVIDER = 'HashProvider',
  STORAGE_PROVIDER = 'StorageProvider',
  MAIL_PROVIDER = 'MailProvider',
  MAIL_TEMPLATE_PROVIDER = 'MailTemplateProvider'
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

  container.registerSingleton<MailTemplateProvider>(
    Providers.MAIL_TEMPLATE_PROVIDER,
    HandlebarsMailTemplateProvider
  );

  container.registerInstance<MailProvider>(
    Providers.MAIL_PROVIDER,
    container.resolve(EtherealMailProvider)
  );

  container.registerSingleton<IStorageProvider>(
    Providers.STORAGE_PROVIDER,
    DiskStorageProvider
  );
}
