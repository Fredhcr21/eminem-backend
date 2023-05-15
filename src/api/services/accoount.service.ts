import { Request } from 'express';
import { Appointment, AppointmentModel, User, UserModel } from '../models';
import { Helpers } from '../../helpers';
import { ResponsePagination, ResponseSuccess } from '../types';

export const me = async (req: Request): Promise<UserModel> => {
  const token = await Helpers.token.getTokenFromRequest(req);

  if (!token) throw 'tokenNotPresent';

  // validate the token
  const user = await Helpers.token.validateJwtToken(token);

  if (!user) throw 'tokenInvalid';

  return user;
};

export const appointments = async (req: Request): Promise<ResponsePagination<AppointmentModel>> => {
  const user = req.me;

  // @ts-ignore
  // Run the query
  const totalCount = await Appointment.estimatedDocumentCount({ user: user.id });

  // @ts-ignore
  const items = await Appointment.find({ user: user.id })
    .populate('user')
    .sort('-eventStartTime')
    .skip(0)
    .limit(50)
    .exec();

  return {
    items,
    totalCount,
  };
};

export const nextAppointment = async (req: Request): Promise<AppointmentModel> => {
  const user = req.me;

  // @ts-ignore
  const item = await Appointment.findOne({ user: user.id, evenCanceled: false })
    .populate('user')
    .sort('-eventStartTime')
    .skip(0)
    .limit(50)
    .exec();

  if (!item) throw new Error('No appointments scheduled');

  return item;
};

export const updatePassword = async (
  currentPassword: string,
  newPassword: string,
  req: Request,
): Promise<ResponseSuccess> => {
  // If the password doesn't match, then alse exit thru "badCombo".
  try {
    // @ts-ignore
    await Helpers.utils.passwords.checkPassword(currentPassword, req.me.password);
  } catch (err) {
    throw new Error('The provided current password is invalid');
  }

  // Hash the new password.
  const newPasswordHash = await Helpers.utils.passwords.hashPassword(newPassword);

  // @ts-ignore
  // Update the record for the logged-in user.
  await User.findByIdAndUpdate(req.me.id, {
    password: newPassword,
  });

  return { message: 'The password was successfully updated.' };
};
