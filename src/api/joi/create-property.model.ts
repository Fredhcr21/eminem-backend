import Joi from 'joi';

export const createPropertyModel = Joi.object({
  title: Joi.string().alphanum().min(5).max(100).required(),

  description: Joi.string().alphanum().min(10).max(1000).required(),

  airConditioning: Joi.boolean().required(),

  availableFrom: Joi.number().required(),

  bathrooms: Joi.number().required(),

  bedrooms: Joi.number().required(),

  betweenStreets: Joi.string().required(),

  city: Joi.string().required(),

  equippedKitchen: Joi.boolean().required(),

  externalNumber: Joi.string().required(),

  floors: Joi.number().required(),

  garageSize: Joi.number().required(),

  gym: Joi.boolean().required(),

  houseArea: Joi.number().required(),

  internalNumber: Joi.number().required(),

  keywords: Joi.array().items(Joi.string()).min(1).required(),

  laundryRoom: Joi.boolean().required(),

  neighborhood: Joi.string().required(),

  petsAllowed: Joi.boolean().required(),

  pool: Joi.boolean().required(),

  postalCode: Joi.number().required(),

  price: Joi.number().required(),

  security: Joi.boolean().required(),

  state: Joi.string().required(),

  status: Joi.string().valid('Rent', 'Sale').required(),

  street: Joi.string().required(),

  type: Joi.string().valid('Apartment', 'House', 'Hotel', 'Villa').required(),

  yardArea: Joi.number().required(),

  geo: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }),

  fullAddress: Joi.string().required(),
});
