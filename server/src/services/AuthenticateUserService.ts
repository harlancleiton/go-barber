import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { User } from '~/entities/User';
import { UsersRepository } from '~/repositories/UsersRepository';

interface ServiceRequest {
  email: string;
  password: string;
}

interface ServiceResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export class AuthenticateUserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email, password }: ServiceRequest): Promise<ServiceResponse> {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) throw new Error('Incorrect email/password combination');

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      throw new Error('Incorrect email/password combination');

    // TODO add env
    const appkey = 'gEBQpEpiHn5QS4zZQ8XcNCGbuAVbM6gT';
    // TODO add env
    const expiresIn = '1d';

    const token = sign({}, appkey, { subject: user.id, expiresIn });

    return { user, token, refreshToken: '' };
  }
}
