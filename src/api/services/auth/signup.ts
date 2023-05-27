import { Request } from 'express';
import { Account } from '../../types';
import { Attempt, Role, User } from '../../models';
import { Helpers } from '../../../helpers';
import { Config } from '../../../config';
import { logger } from '../../../core';

export const signup = async (email: string, password: string, fullname: string, req: Request): Promise<Account> => {
  const newEmailAddress = email.toLowerCase();

  // Build up data fot the new user record and save it to the database.
  // (Also use `fetch` to retrieve the new ID so that we can use it below.)
  const newUserRecord = await new User(
    Object.assign(
      {
        email: newEmailAddress,
        password: await Helpers.utils.passwords.hashPassword(password),
        fullname: fullname,
        tosAcceptedByIp: req.ip,
      },
      Config.auth.verifyEmailAddresses
        ? {
            emailProofToken: await Helpers.utils.randomString(),
            emailProofTokenExpiresAt: Date.now() + Config.auth.emailProofTokenTTL,
            emailStatus: 'unconfirmed',
          }
        : {},
    ),
  ).save();

  const defaultRole = await Role.findOne({
    isDefaultRole: true,
  });

  if (defaultRole) {
    newUserRecord.roles = [...newUserRecord.roles, defaultRole.id];
    newUserRecord.save();
  }

  // Store the user's new id in their session.
  // @ts-ignore
  req.me = newUserRecord;

  if (Config.auth.verifyEmailAddresses) {
    // Send "confirm account" email
    await Helpers.utils.sendTemplateEmail({
      to: newEmailAddress,
      subject: 'Please confirm your account',
      template: 'email-verify-account',
      templateData: {
        fullname: fullname,
        token: newUserRecord.emailProofToken,
      },
    });
  } else {
    logger.info('Skipping new account email verification... (since `verifyEmailAddress` is disabled)');
  }

  const address = await Helpers.utils.addressFromRequest(req);

  const attempt = {
    user: newUserRecord.id,
    successful: true,
    ...address,
  };
  //@ts-ignore
  new Attempt(attempt).save((err) => {
    // Return a modified error here (or a special exit signal)
    // and .create() will throw that instead
    if (err) logger.warn(err);
  });

  // Returns the token immediately
  const jwtData = await Helpers.token.createToken(req, newUserRecord, false);

  // Send success response (this is where the session actually gats persisted)
  //@ts-ignore
  return {
    ...newUserRecord.toJSON(),
    accessToken: jwtData.token,
    refreshToken: jwtData.expires,
  };
};
