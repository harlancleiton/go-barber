import { IUser } from './IUser';

export enum UserTokenType {
  REFRESH_TOKEN = 'refresh_token',
  FORGOT_PASSWORD = 'forgot_password'
}

export interface IUserToken {
  id: string;

  token: string;

  type: UserTokenType;

  user: IUser;

  createdAt: Date;

  updatedAt: Date;
}
