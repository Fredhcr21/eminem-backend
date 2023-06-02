import { Router } from 'express';
import { HookController } from '../controllers';

export default Router()
  .post('/calendly/created', HookController.calendlyCreated)
  .post('/calendly/canceled', HookController.calendlyCanceled);
