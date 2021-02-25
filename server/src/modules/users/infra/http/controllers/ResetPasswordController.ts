import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordService } from '~/modules/users/services';

export class ResetPasswordController {
  async store(request: Request, response: Response): Promise<Response> {
    const resetPasswordService = container.resolve(ResetPasswordService);

    const { token, password } = request.body;

    await resetPasswordService.execute({
      token,
      password
    });

    return response.status(204).json();
  }
}
