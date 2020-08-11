import { Repository, getRepository } from 'typeorm';

import { ICreateAppointmentDto } from '../../../dtos';
import { IAppointmentsRepository } from '../../../repositories';
import { Appointment } from '../entities';

export class AppointmentsRepository implements IAppointmentsRepository {
  private readonly ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider: { id: provider },
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { date },
    });

    return appointment;
  }
}
