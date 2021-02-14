import { IAppointment } from '../domain';
import { IAppointmentRepository } from '../repositories';

export class FindAppointmentsService {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  public async execute(): Promise<IAppointment[]> {
    const appointments = await this.appointmentRepository.find();

    return appointments;
  }
}
