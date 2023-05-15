/**
 * Validates a token
 *
 * @param {String} token the token to be validated
 * @param {Function} cb called when error has occured or token is validated
 */
import jwt from 'jsonwebtoken';
import { UserModel } from '../../api/models';
import { Config } from '../../config';
import { UnauthorizedError } from '../../core';
import { Helpers } from '..';

export default async function validateJwtToken(token: string): Promise<UserModel> {
  // @ts-ignore
  // decode the token
  const _token = jwt.decode(token, Config.jwt.secret);

  if (!_token) throw new UnauthorizedError();

  // set the time of the request
  const _reqTime = Date.now();

  //@ts-ignore
  // If token is expired
  if (_token.exp <= _reqTime) throw new UnauthorizedError();

  // @ts-ignore
  // If token is early
  if (_reqTime <= _token.nbf) throw new UnauthorizedError();

  // If audience doesn't match
  if (Config.jwt.audience !== _token.aud) throw new UnauthorizedError();

  // Find the user the given token is issued to
  const user = await Helpers.token.findUserFromToken(_token);
  return user;
}
