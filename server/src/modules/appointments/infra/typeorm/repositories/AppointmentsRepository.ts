import { DeepPartial, getRepository, Raw, Repository } from 'typeorm';

import { FindManyOptions } from '~/@types';
import { FindAllInMonthFromProviderDto } from '~/modules/appointments/dtos';
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

  async find(options?: FindManyOptions<Appointment>): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find(options);

    return appointments;
  }

  async findAndCount(
    options?: FindManyOptions<Appointment>
  ): Promise<[Appointment[], number]> {
    const [appointments, total] = await this.ormRepository.findAndCount(
      options
    );

    return [appointments, total];
  }

  async findAllInMonthFromProvider({
    provider,
    month,
    year
  }: FindAllInMonthFromProviderDto): Promise<Appointment[]> {
    const formatString = 'MM-YYYY';

    const parsedMonth = String(month).padStart(2, '0');
    const parsedDate = `${parsedMonth}-${year}`;

    const appointments = this.ormRepository.find({
      where: {
        provider: { id: provider.id },
        date: Raw(
          columnAlias =>
            `to_char(${columnAlias}, '${formatString}') = '${parsedDate}'`
        )
      }
    });

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
