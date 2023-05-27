import { Request } from 'express';
import { ResponseSuccess } from '../../types';
import { User } from '../../models';
import { Helpers } from '../../../helpers';

export const recoverPassword = async (password: string, token: string, req: Request): Promise<ResponseSuccess> => {
  if (!token) {
    throw 'invalidToken';
  }

  // Look up the user with this reset token.
  const userRecord = await User.findOne({ passwordResetToken: token });

  // If no such user exists, or their token is expired, bail.
  if (!userRecord || userRecord.passwordResetTokenExpiresAt <= Date.now()) {
    throw 'invalidToken';
  }

  // Hash the new password.
  const hashed = await Helpers.utils.passwords.hashPassword(password);

  // Store the user's new password and clear their token so it can't be used again.
  await User.findByIdAndUpdate(userRecord.id, {
    password: hashed,
    passwordResetToken: '',
    passwordResetTokenExpiresAt: 0,
  });

  // Log the user in.
  //@ts-ignore
  req.me = userRecord;

  return { message: 'The password was successfully recovered.' };
};
