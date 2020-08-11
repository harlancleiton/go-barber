import { ICreateAppointmentDTO } from '../dtos';
import { Appointment } from '../infra';

export default interface IAppointmentsRepository {
  create(createAppointment: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;
}
