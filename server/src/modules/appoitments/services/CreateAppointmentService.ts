import { startOfHour } from 'date-fns';

import { GoBarberException } from '../../../shared/exceptions';
import { Appointment } from '../infra';
import { IAppointmentsRepository } from '../repositories';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(
    private readonly appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppoitmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppoitmentInSameDate)
      throw new GoBarberException('This appointment is already booked', 400);

    const appointment = await this.appointmentsRepository.create({
      provider,
      date,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
