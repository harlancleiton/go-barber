import { hash, genSalt, compare } from 'bcryptjs';

import { hashConfig } from '~/config/hash';

import { IHashProvider } from '../IHashProvider';

export class BCryptHashProvider implements IHashProvider {
  async generate(payload: string, rounds?: number): Promise<string> {
    const salt = await genSalt(rounds || hashConfig.bcrypt.rounds);

    const hashed = await hash(payload, salt);
    return hashed;
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    const matched = await compare(payload, hashed);
    return matched;
  }
}
