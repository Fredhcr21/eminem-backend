import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { handleError, logger } from '../../core';
import { CalendlyService } from '../services';

//@ts-ignore
export const calendlyCreated = async (req: Request, res: Response, next: NextFunction): void => {
  try {
    logger.debug(`POST /calendly/created : ${JSON.stringify(req.body)}`);
    const body = req.body;
    const result = await CalendlyService.calendlyCreated(body);
    logger.debug(`POST /calendly/created result: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json();
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

// @ts-ignore
export const calendlyCanceled = async (req: Request, res: Response, next: NextFunction): void => {
  try {
    logger.debug(`POST /calendly/canceled : ${JSON.stringify(req.body)}`);
    const body = req.body;
    const result = await CalendlyService.calendlyCanceled(body);
    logger.debug(`POST /calendly/canceled result: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json();
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
