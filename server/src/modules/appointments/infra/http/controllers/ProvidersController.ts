import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProvidersService } from '~/modules/appointments/services';

export class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    if (!request.auth) return response.status(401).json();

    const { user } = request.auth;

    const listProvidersService = container.resolve(ListProvidersService);

    // TODO add pagination
    const providers = await listProvidersService.execute({ user });

    return response.json(providers);
  }
}
