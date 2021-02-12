import { parseISO } from 'date-fns';
import { Router } from 'express';

import { AppointmentRepository } from '~/repositories/AppointmentsRepository';
import { CreateAppointmentService } from '~/services/CreateAppointmentService';

export const appointmentsRouter = Router();

appointmentsRouter.post('/', async (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentRepository = new AppointmentRepository();
  const createAppointmentService = new CreateAppointmentService(
    appointmentRepository
  );

  const appointment = await createAppointmentService.execute({
    provider,
    date: parsedDate
  });

  return response.status(201).json(appointment);
});
