import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { ensureAuthenticated } from '../../../../users';
import { CreateAppointmentService } from '../../../services';
import { AppointmentsRepository } from '../../../repositories';

const appointmentsRouter = Router();
const createAppointment = new CreateAppointmentService();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.status(201).json(appointment);
});

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

export default appointmentsRouter;
