import { ICreateAppointmentDto } from '../dtos';
import { Appointment } from '../infra';

export interface IAppointmentsRepository {
  create(createAppointment: ICreateAppointmentDto): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;
}
