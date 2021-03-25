import { factories } from '~/shared/factories';

import { IAppointmentRepository } from '../repositories';
import { FakeAppointmentRepository } from '../repositories/fakes';
import { ListProviderMonthAvailabilityService } from './ListProviderMonthAvailabilityService';

describe('ListProviderMonthAvailabilityService', () => {
  let appointmentsRepository: IAppointmentRepository;
  let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      appointmentsRepository
    );
  });

  it('should be able to list the month availability from provider', async () => {
    const appointmentsLength = factories.faker.random.number({
      min: 1,
      max: 100
    });

    const appointmentsCreatedAt = factories.faker.date.recent();

    const provider = factories.user.build();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const appointments = factories.appointment.buildList(appointmentsLength, {
      provider,
      createdAt: appointmentsCreatedAt
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider,
      month: appointmentsCreatedAt.getMonth(),
      year: appointmentsCreatedAt.getFullYear()
    });

    expect(availability.length).toEqual(appointmentsLength);
    expect(availability).toEqual(
      expect.arrayContaining([
        { day: appointmentsCreatedAt.getDate() - 1, available: true },
        { day: appointmentsCreatedAt.getDate(), available: false },
        { day: appointmentsCreatedAt.getDate() + 1, available: true }
      ])
    );
  });
});
