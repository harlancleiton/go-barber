import { DeepPartial, getRepository, Repository } from 'typeorm';

import { IAppointmentRepository } from '~/modules/appointments/repositories';

import { Appointment } from '../entities';

export class AppointmentRepository implements IAppointmentRepository {
  private readonly ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  async save(appointment: Appointment): Promise<Appointment> {
    return await this.ormRepository.save(appointment);
  }

  async create(partial: DeepPartial<Appointment>): Promise<Appointment> {
    const appointment = this.ormRepository.create(partial);
    await this.ormRepository.save(appointment);

    return appointment;
  }

  async find(): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find();

    return appointments;
  }

  async findByDate(date: Date): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: { date }
    });

    return appointments;
  }

  async findOneByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { date }
    });

    return appointment;
  }
}
