import { SignOptions, Secret } from 'jsonwebtoken';

import { User } from '~/entities/User';

interface AuthConfig {
  jwt: {
    uid: keyof User;
    options: SignOptions & { secret: Secret };
  };
}

export const authConfig: AuthConfig = {
  jwt: {
    uid: 'id',
    // TODO add env
    options: { secret: 'gEBQpEpiHn5QS4zZQ8XcNCGbuAVbM6gT', expiresIn: '1d' }
  }
};
