import {
  Appointment,
  AppointmentRepository
} from '~/modules/appointments/infra/typeorm';

export class FindAppointmentsService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  public async execute(): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.find();

    return appointments;
  }
}
