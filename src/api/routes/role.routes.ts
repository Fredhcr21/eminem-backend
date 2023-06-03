import { Router } from 'express';
import { RoleController } from '../controllers';

export default Router()
  .get('/', RoleController.find)
  .get('/:id', RoleController.getById)
  .get('/permissions', RoleController.getRolePermissions)
  .post('/', RoleController.create)
  .put('/:id', RoleController.update)
  .put('/permissions/:id', RoleController.updateRolePermissions)
  .delete('/:id', RoleController.deleteById);
