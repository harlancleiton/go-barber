import { getRepository, Repository } from 'typeorm';

import { Appointment } from '~/entities/Appointment';

export class AppointmentRepository {
  private readonly typeormRepository: Repository<Appointment>;

  constructor() {
    this.typeormRepository = getRepository(Appointment);
  }

  async create(partial: Partial<Appointment>): Promise<Appointment> {
    const appointment = this.typeormRepository.create(partial);
    await this.typeormRepository.save(appointment);

    return appointment;
  }
}
