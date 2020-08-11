import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAppointmentService } from '../../../services';

export class AppointmentsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  }
}
