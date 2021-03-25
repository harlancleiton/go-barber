import { IUser } from '~/modules/users/domain';

export class FindAllInMonthFromProviderDto {
  provider: IUser;

  month: number;

  year: number;

  constructor(partial: Partial<FindAllInMonthFromProviderDto>) {
    Object.assign(this, partial);
  }
}
