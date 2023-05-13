import express from 'express';
import { UserController } from '../controllers';

export default express
  .Router()
  .get('/', UserController.find)
  .get('/:id', UserController.getById)
  .put('/:id', UserController.update)
  .delete('/:id', UserController.deleteById)
  .put('/:id/roles', UserController.updateUserRoles);
