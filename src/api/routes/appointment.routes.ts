import { Router } from 'express';
import { AppointmentController } from '../controllers';

export default Router()
  .get('/', AppointmentController.find)
  .get('/:id', AppointmentController.getById)
  .delete('/:id', AppointmentController.deleteById)
  .post('/', AppointmentController.create)
  .put('/:id', AppointmentController.update);
