import { NextFunction, Request, Response } from 'express';
import * as HTTPStatus from 'http-status-codes';
import { handleError, logger } from '../../core';
import { AccountService } from '../services';

export const me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /account/me : no params');
    const result = await AccountService.me(req);
    logger.debug(`GET /account/me response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const appointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /account/appointments : no params');
    const result = await AccountService.appointments(req);
    logger.debug(`GET /account/appointments response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const nextAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.debug('GET /account/appointments/next : no params');
    const result = await AccountService.nextAppointment(req);
    logger.debug(`GET /account/appointment/next response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { current, newPassword } = req.body;
    logger.debug('PUT /account/update-password : secret params');
    const result = await AccountService.updatePassword(current, newPassword, req);
    logger.debug(`PUT /account/update-password response: ${JSON.stringify(result)}`);
    res.status(HTTPStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
