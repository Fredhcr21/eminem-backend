import { NextFunction, Request, Response } from 'express';
import { validateFirebaseIDToken } from '../../helpers/validate-firebase-idtoken';

export async function isLoggedIn(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.headers.authorization) {
      throw new Error('Unauthorized, Authorization header not provided');
    }

    const [, token] = req.headers.authorization.split(' ');
    if (!token) {
      throw new Error('Unauthorized token not privided');
    }

    const userUID = await validateFirebaseIDToken(token);
    if (!userUID) throw new Error('Unauthorized');

    // Add the User UID to the request object
    req.me = userUID;
    return next();
  } catch (err) {
    res.status(403).send('Unauthorized, Authorization header not provided');
  }
}
