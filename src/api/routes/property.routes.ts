import express from 'express';
import { PropertyController } from '../controllers';
import { validateSchema } from '../middlewares';
import { createPropertyModel } from '../joi';

export default express
  .Router()
  .get('/', PropertyController.find)
  .get('/:id', PropertyController.getById)
  .post('/', validateSchema(createPropertyModel), PropertyController.create)
  .put('/:id', PropertyController.update)
  .delete('/:id', PropertyController.deleteById);
