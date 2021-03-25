import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  CreateAppointmentService,
  ListProviderMonthAvailabilityService
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
    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService
    );

    if (!request.auth) return response.status(401).json();

    const { user } = request.auth;

    const { month, year } = request.query;

    const appointments = await listProviderMonthAvailabilityService.execute({
      provider: user,
      month: Number(month),
      year: Number(year)
    });

    return response.json(appointments);
  }
}
