import Router from "express";
import { CarController } from "../controllers";


export default Router()
    .get('/', CarController.find)
    .get('/:id', CarController.getById)
    .post('/', CarController.create)
    .put('/:id', CarController.update)
    .delete('/:id', CarController.deleteById)