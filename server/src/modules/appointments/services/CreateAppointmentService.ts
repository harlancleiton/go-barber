import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { Providers } from '~/shared/container';
import { GoBarberException } from '~/shared/exceptions/GoBarberException';

import { IAppointment } from '../domain';
import { CreateAppointmentDto } from '../dtos';
import { IAppointmentRepository } from '../repositories';

@injectable()
export class CreateAppointmentService {
  constructor(
    @inject(Providers.APPOINTMENT_REPOSITORY)
    private readonly appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute({
    provider,
    date
  }: CreateAppointmentDto): Promise<IAppointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findOneByDate(
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
