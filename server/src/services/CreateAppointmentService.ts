import { startOfHour } from 'date-fns';

import { CreateAppointmentDto } from '~/dtos/CreateAppointmentDto';
import { Appointment } from '~/entities/Appointment';
import { AppointmentRepository } from '~/repositories/AppointmentsRepository';

export class CreateAppointmentService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  public async execute({
    provider,
    date
  }: CreateAppointmentDto): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate)
      throw Error('This appointment is already booked');

    const appointment = await this.appointmentRepository.create({
      provider,
      date: appointmentDate
    });

    return appointment;
  }
}
