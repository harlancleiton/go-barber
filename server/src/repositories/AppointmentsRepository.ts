import { DeepPartial, getRepository, Repository } from 'typeorm';

import { Appointment } from '~/entities/Appointment';

export class AppointmentRepository {
  private readonly typeormRepository: Repository<Appointment>;

  constructor() {
    this.typeormRepository = getRepository(Appointment);
  }

  async create(partial: DeepPartial<Appointment>): Promise<Appointment> {
    const appointment = this.typeormRepository.create(partial);
    await this.typeormRepository.save(appointment);

    return appointment;
  }

  async find(): Promise<Appointment[]> {
    const appointments = await this.typeormRepository.find();

    return appointments;
  }

  async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.typeormRepository.findOne({
      where: { date }
    });

    return appointment;
  }
}
