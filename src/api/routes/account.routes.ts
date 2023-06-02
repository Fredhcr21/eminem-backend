import { Router } from 'express';
import { AccountController } from '../controllers';

export default Router()
  .get('/me', AccountController.me)
  .get('/appointments', AccountController.appointments)
  .get('/appointments/next', AccountController.nextAppointment)
  .put('/update-password', AccountController.updatePassword);
