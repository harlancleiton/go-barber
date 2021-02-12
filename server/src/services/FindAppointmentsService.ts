import { Appointment } from '~/entities/Appointment';
import { AppointmentRepository } from '~/repositories/AppointmentsRepository';

export class FindAppointmentsService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  public async execute(): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.find();

    return appointments;
  }
}
