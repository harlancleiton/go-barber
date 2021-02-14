import { DeepPartial, getRepository, Repository } from 'typeorm';

import { User } from '../entities';

export class UsersRepository {
  private readonly typeormRepository: Repository<User>;

  constructor() {
    this.typeormRepository = getRepository(User);
  }

  async save(user: User): Promise<User> {
    return await this.typeormRepository.save(user);
  }

  async create(partial: DeepPartial<User>): Promise<User> {
    const appointment = this.typeormRepository.create(partial);
    await this.typeormRepository.save(appointment);

    return appointment;
  }

  async find(): Promise<User[]> {
    const appointments = await this.typeormRepository.find();

    return appointments;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.typeormRepository.findOne({ email });

    return user;
  }
}
