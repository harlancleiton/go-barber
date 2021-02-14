import { IUser } from '~/modules/users/domain';

export interface IAppointment {
  id: string;

  provider: IUser;

  date: Date;

  createdAt: Date;

  updatedAt: Date;
}
