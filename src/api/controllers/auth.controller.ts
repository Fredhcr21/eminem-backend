import { NextFunction, Request, Response } from 'express';
import { handleError, logger } from '../../core';
import { AuthService } from '../services';
import * as HttpStatus from 'http-status-codes';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, rememberMe = false } = req.body;
    logger.debug(`PUT /auth/login : ${JSON.stringify({ email })}`);
    const result = await AuthService.login(email, password, rememberMe, req);
    logger.debug(`PUT /auth/login response: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
