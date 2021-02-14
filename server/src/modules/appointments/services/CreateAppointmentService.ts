import { startOfHour } from 'date-fns';

import {
  Appointment,
  AppointmentRepository
} from '~/modules/appointments/infra/typeorm';
import { GoBarberException } from '~/shared/exceptions/GoBarberException';

import { CreateAppointmentDto } from '../dtos';

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
      throw new GoBarberException('This appointment is already booked', 400);

    const appointment = await this.appointmentRepository.create({
      provider: { id: provider },
      date: appointmentDate
    });

    return appointment;
  }
}
