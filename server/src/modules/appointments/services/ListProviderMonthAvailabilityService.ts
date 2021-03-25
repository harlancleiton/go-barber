import { getDate, getDaysInMonth } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { IUser } from '~/modules/users/domain';
import { Providers } from '~/shared/container';

import { IAppointmentRepository } from '../repositories';

interface ServiceRequest {
  provider: IUser;
  month: number;
  year: number;
}

type ServiceResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export class ListProviderMonthAvailabilityService {
  constructor(
    @inject(Providers.APPOINTMENT_REPOSITORY)
    private readonly appointmentsRepository: IAppointmentRepository
  ) {}

  async execute({
    month,
    provider,
    year
  }: ServiceRequest): Promise<ServiceResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider, month, year }
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (value, index) => index + 1
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day
      );

      return { day, available: appointmentsInDay.length < 10 };
    });

    return availability;
  }
}
