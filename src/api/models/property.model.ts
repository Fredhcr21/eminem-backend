import mongoose from 'mongoose';
import { GeoLocation, GeoLocationMongoDB } from '../types';
import { PropertyStatus, PropertyType } from '../types';
import { LocationSchema } from './location.schema';

export interface PropertyModel extends mongoose.Document {
  title: string;
  description: string;
  airConditioning: boolean;
  availableFrom: number;
  bathrooms: number;
  bedrooms: number;
  betweenStreets: string;
  city: string;
  equippedKitchen: boolean;
  externalNumber: string;
  floors: number;
  garageSize: number;
  gym: boolean;
  houseArea: number;
  internalNumber: string;
  keywords: string[];
  laundryRoom: boolean;
  neighborhood: string;
  petsAllowed: boolean;
  pool: boolean;
  postalCode: string;
  price: number;
  security: boolean;
  state: string;
  status: PropertyStatus;
  street: string;
  type: PropertyType;
  yardArea: number;
  geo: GeoLocationMongoDB | GeoLocation;
  fullAddress: string;
}

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    airConditioning: {
      type: Boolean,
      required: true,
    },
    availableFrom: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    betweenStreets: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    equippedKitchen: {
      type: Boolean,
      required: true,
    },
    externalNumber: {
      type: String,
      required: true,
    },
    floors: {
      type: Number,
      required: true,
    },
    garageSize: {
      type: Number,
      required: true,
    },
    gym: {
      type: Boolean,
      required: true,
    },
    houseArea: {
      type: Number,
      required: true,
    },
    internalNumber: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
    laundryRoom: {
      type: Boolean,
      required: true,
    },
    neighborhood: {
      type: String,
      required: true,
    },
    petsAllowed: {
      type: Boolean,
      required: true,
    },
    pool: {
      type: Boolean,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    security: {
      type: Boolean,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Rent', 'Sale'],
    },
    street: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Apartment', 'House', 'Hotel', 'Villa'],
      required: true,
    },
    yardArea: {
      type: Number,
      required: true,
    },
    geo: {
      type: LocationSchema,
    },
    fullAddress: {
      type: String,
      required: true,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: {
      transform: (_doc, { location, ...ret }) => ({
        ...ret,
        location: { latitude: location?.coordinates[1], longitude: location?.coordinates[0] },
      }),
      virtuals: true,
    },
  },
);
propertySchema.index({ location: '2dsphere' });

export const Property = mongoose.model<PropertyModel>('Property', propertySchema);
