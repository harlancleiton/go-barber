import { startOfHour } from 'date-fns';

import { GoBarberException } from '~/shared/exceptions/GoBarberException';

import { IAppointment } from '../domain';
import { CreateAppointmentDto } from '../dtos';
import { IAppointmentRepository } from '../repositories';

export class CreateAppointmentService {
  constructor(
    private readonly appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute({
    provider,
    date
  }: CreateAppointmentDto): Promise<IAppointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate)
      throw new GoBarberException('This appointment is already booked', 400);

    const appointment = await this.appointmentsRepository.create({
      provider: { id: provider },
      date: appointmentDate
    });

    return appointment;
  }
}
