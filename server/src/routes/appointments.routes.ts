import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { AppointmentsRepository } from '../repositories';
import { CreateAppointmentService } from '../services';

const appointmentsRouter = Router();
const createAppointment = new CreateAppointmentService();

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

export default appointmentsRouter;
