import { NextFunction, Request, Response } from "express";
import * as HTTPStatus from 'http-status-codes'
import { handleError, logger } from "../../core";
import { CarService } from "../services";
import { Helpers } from "../../helpers";



export const find = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        logger.debug(`GET /car : ${JSON.stringify(req.query)}`);
        // @ts-ignore
        const result = await CarService.find(Helpers.utils.buildPaginationQuery(req.query))
        logger.debug(`GET /car response: ${JSON.stringify(result)}`)
        res.status(HTTPStatus.OK).json(result);
        return next()
    } catch (err) {
        return next(handleError(err))
    }
}

export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        logger.debug(`GET /car/:id : ${JSON.stringify(req.params)}`)
        const {id} = req.params;
        const result = await CarService.getById(id);
        logger.debug(`GET /car/:id response: ${JSON.stringify(result)}`)
        res.status(HTTPStatus.OK).json(result)
        return next();
    } catch (err) {
        return next(handleError(err))
    }
}

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        logger.debug(`POST /car : ${JSON.stringify(req.body)}`)
        const car = req.body
        const result = await CarService.create(car);
        logger.debug(`POST /car response: ${JSON.stringify(result)}`)
        res.status(HTTPStatus.OK).json(result)
        return next()
    } catch (err) {
        return next(handleError(err))
    }
}

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {id} = req.params
        const car = req.body
        logger.debug(`PUT /car/:id : ${JSON.stringify(id, car)}`)
        const result = await CarService.update(id, car)
        logger.debug(`PUT /car/:id response: ${JSON.stringify(result)}`)
        res.status(HTTPStatus.OK).json(result)
        return next()
    } catch (err) {
        return next(handleError(err))
    }
}

export const deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {id} = req.params
        logger.debug(`DELETE /car/:id : ${JSON.stringify(req.params)}`)
        const result = await CarService.deleteById(id)
        logger.debug(`DELETE /car/:id response: ${JSON.stringify(result)}`)
        res.status(HTTPStatus.OK).json(result)
        return next()
    } catch (err) {
        return next(handleError(err))
    }
}