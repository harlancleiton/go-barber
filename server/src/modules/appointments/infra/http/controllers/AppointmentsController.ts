import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  CreateAppointmentService,
  FindAppointmentsService
} from '~/modules/appointments/services';

export class AppointmentsController {
  async store(request: Request, response: Response): Promise<Response> {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
      CreateAppointmentService
    );

    const appointment = await createAppointmentService.execute({
      provider,
      date: parsedDate
    });

    return response.status(201).json(appointment);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const findAppointmentsService = container.resolve(FindAppointmentsService);

    const appointments = await findAppointmentsService.execute();

    return response.json(appointments);
  }
}
