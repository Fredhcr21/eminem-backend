import { Router } from 'express';
import { PermissionController } from '../controllers';

export default Router().get('/find', PermissionController.find);
