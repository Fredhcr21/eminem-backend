import express from 'express';
import { PropertyController } from '../controllers';

export default express
  .Router()
  .get('/', PropertyController.find)
  .get('/:id', PropertyController.getById)
  .post('/', PropertyController.create)
  .put('/:id', PropertyController.update)
  .delete('/:id', PropertyController.deleteById);
