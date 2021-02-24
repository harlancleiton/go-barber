import { DeepPartial, getRepository, Repository } from 'typeorm';

import { FindOneOptions } from '~/@types';
import { IUserRepository } from '~/modules/users/repositories';

import { User } from '../entities';

export class UserRepository implements IUserRepository {
  private readonly ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  async create(partial: DeepPartial<User>): Promise<User> {
    const appointment = this.ormRepository.create(partial);
    await this.ormRepository.save(appointment);

    return appointment;
  }

  async find(): Promise<User[]> {
    const appointments = await this.ormRepository.find();

    return appointments;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  async findOne(options: FindOneOptions<User>): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(options);

    return user;
  }
}
