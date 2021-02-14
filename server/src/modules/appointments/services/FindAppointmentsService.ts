import { inject, injectable } from 'tsyringe';

import { Providers } from '~/shared/container';

import { IAppointment } from '../domain';
import { IAppointmentRepository } from '../repositories';

@injectable()
export class FindAppointmentsService {
  constructor(
    @inject(Providers.APPOINTMENT_REPOSITORY)
    private readonly appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute(): Promise<IAppointment[]> {
    const appointments = await this.appointmentsRepository.find();

    return appointments;
  }
}
