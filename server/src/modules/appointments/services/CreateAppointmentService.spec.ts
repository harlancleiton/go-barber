import { startOfHour } from 'date-fns';

import { GoBarberException } from '~/shared/exceptions';
import { factories } from '~/shared/factories';

import { IAppointmentRepository } from '../repositories';
import { FakeAppointmentRepository } from '../repositories/fakes';
import { CreateAppointmentService } from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  let appointmentsRepository: IAppointmentRepository;
  let createAppointmentService: CreateAppointmentService;

  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentRepository();
    createAppointmentService = new CreateAppointmentService(
      appointmentsRepository
    );
  });

  it('should be able to create a new appointment', async () => {
    const date = factories.faker.date.future();
    const provider = factories.faker.random.uuid();

    const appointment = await createAppointmentService.execute({
      date,
      provider
    });

    expect(appointment).toBeDefined();
    expect(appointment.provider.id).toEqual(provider);
    expect(appointment.date).toEqual(startOfHour(date));
  });

  it('should not be able to create two appointments on the same time', async () => {
    const date = factories.faker.date.future();
    const provider = factories.faker.random.uuid();

    jest
      .spyOn(appointmentsRepository, 'findOneByDate')
      .mockImplementation(async () => factories.appointment.build());
    jest.spyOn(appointmentsRepository, 'create');

    await expect(
      createAppointmentService.execute({
        date,
        provider
      })
    ).rejects.toBeInstanceOf(GoBarberException);

    expect(appointmentsRepository.create).not.toBeCalled();
  });
});
