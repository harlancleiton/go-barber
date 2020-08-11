import { parseISO } from 'date-fns';
import { Router } from 'express';

import { ensureAuthenticated } from '../../../../users';
import { CreateAppointmentService } from '../../../services';
import { AppointmentsRepository } from '../../typeorm';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    provider,
    date: parsedDate,
  });

  return response.status(201).json(appointment);
});

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

export default appointmentsRouter;
