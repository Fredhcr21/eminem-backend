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

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, fullname } = req.body;
    logger.debug(`POST /auth/signup : ${JSON.stringify({ email, fullname })}`);
    const result = await AuthService.signup(email, password, fullname, req);
    logger.debug(`POST /auth/signup response: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const recoveredPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { password, token } = req.body;
    logger.debug(`PUT /auth/recover-password : secret params`);
    const result = await AuthService.recoverPassword(password, token, req);
    logger.debug(`PUT /auth/recoveredPassword response: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const sendPasswordRecoveryEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.query;
    logger.debug(`GET /auth/send-password-recovery-email : ${JSON.stringify({ email })}`);
    // @ts-ignore
    const result = await AuthService.sendPasswordRecoveryEmail(email);
    logger.debug(`GET /auth/send-password-recovery-email response: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};

export const confirmEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.query;
    logger.debug(`GET /auth/email/confirm : secret params`);
    //@ts-ignore
    const result = await AuthService.confirmEmail(token, req);
    logger.debug(`GET /aut/email/confirm response: ${JSON.stringify(result)}`);
    res.status(HttpStatus.OK).json(result);
    return next();
  } catch (err) {
    return next(handleError(err));
  }
};
