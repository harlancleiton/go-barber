import { DeepPartial, FindManyOptions } from '~/@types';

import { IAppointment } from '../domain';
import { FindAllInMonthFromProviderDto } from '../dtos';

export interface IAppointmentRepository {
  create(partial: DeepPartial<IAppointment>): Promise<IAppointment>;

  save(appointment: IAppointment): Promise<IAppointment>;

  find(options?: FindManyOptions<IAppointment>): Promise<IAppointment[]>;

  findAndCount(
    options?: FindManyOptions<IAppointment>
  ): Promise<[IAppointment[], number]>;

  findAllInMonthFromProvider(
    findAllInMonthFromProvider: FindAllInMonthFromProviderDto
  ): Promise<IAppointment[]>;

  findOneByDate(date: Date): Promise<IAppointment | undefined>;

  findByDate(date: Date): Promise<IAppointment[]>;
}
