import { parseISO } from 'date-fns';
import { Router } from 'express';
import { container } from 'tsyringe';

import { ensureAuthenticated } from '../../../../users';
import { CreateAppointmentService } from '../../../services';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

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

export { appointmentsRouter };
