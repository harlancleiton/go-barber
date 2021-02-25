import { Router } from 'express';

import {
  ForgotPasswordController,
  ResetPasswordController
} from '../controllers';

export const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.store);
passwordRouter.post('/reset', resetPasswordController.store);
