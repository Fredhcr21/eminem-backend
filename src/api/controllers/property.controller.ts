import { NextFunction, Request, Response } from 'express';
import { handleError, logger } from '../../core';
import { PropertyService } from '../services';
import { Helpers } from '../../helpers';
import * as HttpStatus from 'http-status-codes';

export const find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`GET /property : ${JSON.stringify(req.query)}`);
    // @ts-ignore
    const result = await PropertyService.find(Helpers.utils.buildPaginationQuery(req.query));
    logger.debug(`GET /property response: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`GET /property/:id : ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    const result = await PropertyService.getById(id);
    logger.debug(`GET /property/:id response: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`POST /property : ${JSON.stringify(req.body)}`);
    const property = req.body;
    const result = await PropertyService.create(property);
    logger.debug(`POST /property response: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const property = req.body;
    logger.debug(`PUT /property/:id : ${JSON.stringify(id, property)}`);
    const result = await PropertyService.update(id, property);
    logger.debug(`PUT /property/:id response: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug(`DELETE /property/:id : ${JSON.stringify(req.params)}`);
    const { id } = req.params;
    const result = await PropertyService.deleteById(id);
    logger.debug(`DELETE /property/:id response: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
