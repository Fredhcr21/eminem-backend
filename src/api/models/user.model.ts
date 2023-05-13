import mongoose from 'mongoose';
import { GeoLocation } from '../types';
import { omit } from 'ramda';
import { RoleModel } from './role.model';

export interface UserLocation {
  country: string;
  countryCode: string;
  city: string;
  cityCode: string;
  location: GeoLocation;
}
export interface UserModel extends mongoose.Document {
  birthDayTime: string;
  birthDayTimeZone: string;
  gender: number; // 1 -male | 2 = female
  placeOfBirth: UserLocation;
  placeOfResidence: UserLocation;
  placeOfResidenceTimeZone: string;
  sign: string;

  // ACCOUNT DATA
  email: string;
  password: string;
  fullName: string;

  // AUTH DATA
  roles: RoleModel[] | string[];
  passwordResetToken: string;
  passwordResetTokenExpiresAt: number;
  emailProofToken: string;
  emailProofTokenExpiresAt: number;
  emailStatus: string;
  emailChangeCandidate: string;
  tosAcceptedByIp: string;
  lastSeenAt: number;
}

const userSchema = new mongoose.Schema(
  {
    // CUSTOM
    birthDayTime: {
      type: 'string',
    },
    birthDayTimeZone: {
      type: 'string',
    },
    gender: {
      type: 'number',
      enum: [1, 2], // 1 = male | 2 = female
    },
    placeOfBirth: {},
    placeOfResidence: {},
    placeOfResidenceTimeZone: {
      type: 'string',
    },
    sign: {
      type: 'string',
    },

    // ACCOUNT DATA
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      maxlength: 120,
    },
    // AUTH DATA
    /**
     * A unique token used to verify the user's identity when recovering a password.
     * Expires after 1 use, or after a set amount of time has elapsed.
     */
    passwordResetToken: { type: String },
    /**
     * A JS timestamp (epoch ms) representing the moment when this user's `passwordResetToken`
     * will expire (or 0 if the userr currently has no such token)
     */
    passwordResetTokenExpiressAt: { type: Number },
    /**
     * A pseudorandom, probabilistically-unique token for use in our account verification emails.
     */
    emailProofToken: { type: String },
    /**
     * A JS timestamp (epoch ms) representing the moment when this user's `emailProofToken`
     * will expire (or 0 if the user currently has no such token)
     */
    emailProofTokenExpiresAt: { type: Number },
    /**
     * The confirmation status of the user's email address.
     * Users might be created as "unconfirmed" (e.g. normal signup) or as "confirmed" (e.g. hard-coded
     * admin users). When the email verification feature is enabled, new users created via the
     * signup from have \`emailStatus: 'unconfirmed'\` until they click the link in the confirmation email.
     * Similarly, when an existing user changes their email address, they switch to the "changeRequest"
     * email status until they click the link in the confirmation email
     */
    emailStatus: {
      type: String,
      enum: ['unconfirmed', 'changeRequest', 'confirmed'],
      default: 'confirmed',
    },
    /**
     * The (still-confirmed) email address that this user wnats to change to.
     */
    emailChangeCandidate: {
      type: String,
    },
    /**
     * The IP (ipv4) address of the request that accepted the terms of service.
     * UseFul for the certain types of businesses and regulatory requeriments (KYC, etc.)
     * moreInfoUrl: https://en.wikipedia.org/wiki/Know_your_customer
     */
    tosAcceptedByIp: {
      type: String,
    },
    /**
     * A JS timestamp (epoch ms) representing the moment at wich this user most recently
     * interacted with the backend while logged in (or 0 if the have not interacted withh the backend at all yet).
     */
    lastSeenAt: {
      type: Number,
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      transform: (_doc, ret) => {
        return omit(
          [
            'password',
            'passwordResetToken',
            'passwordResetTokenExpiresAt',
            'emailProofToken',
            'emailProofTokenExpiresAt',
            'emailSatus',
            'emailChangeCandidate',
            'tosAcceptedByIp',
            'lastSeenAt',
          ],
          ret,
        );
      },
      virtuals: true,
    },
  },
);

export const User = mongoose.model<UserModel>('User', userSchema);
