import { IUser } from '../domain';

export interface FindProvidersDto {
  excludeUser?: IUser;
}
