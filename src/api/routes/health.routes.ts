import { Router } from 'express';
import { HealthController } from '../controllers';

export default Router().get('/', HealthController.health);
