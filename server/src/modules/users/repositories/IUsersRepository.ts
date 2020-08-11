import { ICreateUserDto } from '../dtos';
import { User } from '../infra/typeorm/entities';

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  create(createUser: ICreateUserDto): Promise<User>;

  save(user: User): Promise<User>;
}
