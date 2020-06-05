import { User } from '../models';

declare module 'express-serve-static-core' {
  export interface Request {
    auth?: {
      token: { iat: number; exp: number; iss: string; sub: string };
      userPrimaryKey: string;
      getUser: () => Promise<User>;
    };
  }
}
