import { User } from '~/entities/User';

export type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

declare module 'express-serve-static-core' {
  interface Auth {
    user: User;
    token: TokenPayload;
  }

  export interface Request {
    auth?: Auth;
  }
}
