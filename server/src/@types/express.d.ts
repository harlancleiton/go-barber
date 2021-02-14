import { IUser } from '~/modules/users/domain';

export type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

declare module 'express-serve-static-core' {
  interface Auth {
    user: IUser;
    token: TokenPayload;
  }

  export interface Request {
    auth?: Auth;
  }
}
