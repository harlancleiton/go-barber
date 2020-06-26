import { Repository, EntityRepository } from 'typeorm';

import { User } from '../infra/typeorm/entities';

@EntityRepository(User)
class AppoitmentsRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({ where: { email } });

    return user || null;
  }
}

export default AppoitmentsRepository;
