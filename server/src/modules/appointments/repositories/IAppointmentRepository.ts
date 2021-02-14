import { DeepPartial } from '~/@types';

import { IAppointment } from '../domain';

export interface IAppointmentRepository {
  create(partial: DeepPartial<IAppointment>): Promise<IAppointment>;

  save(appointment: IAppointment): Promise<IAppointment>;

  find(): Promise<IAppointment[]>;

  findOneByDate(date: Date): Promise<IAppointment | undefined>;

  findByDate(date: Date): Promise<IAppointment[]>;
}
