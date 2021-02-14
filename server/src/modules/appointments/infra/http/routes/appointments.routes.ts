import { parseISO } from 'date-fns';
import { Router } from 'express';
import { container } from 'tsyringe';

import {
  CreateAppointmentService,
  FindAppointmentsService
} from '~/modules/appointments/services';

export const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const findAppointmentsService = container.resolve(FindAppointmentsService);

  const appointments = await findAppointmentsService.execute();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointmentService = container.resolve(CreateAppointmentService);

  const appointment = await createAppointmentService.execute({
    provider,
    date: parsedDate
  });

  return response.status(201).json(appointment);
});
