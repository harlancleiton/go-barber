import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { Appointment } from '../entities';
import { AppointmentsRepository } from '../repositories';
import { GoBarberException } from '../../../shared/exceptions';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppoitmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppoitmentInSameDate)
      throw new GoBarberException('This appointment is already booked', 400);

    const appointment = appointmentsRepository.create({
      provider: { id: provider_id },
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;