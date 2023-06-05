import { Property, PropertyModel } from '../models';
import { GeoLocation, GeoLocationMongoDB, PaginationQuery, ResponsePagination } from '../types';

const formatLocation = (property: PropertyModel): GeoLocationMongoDB => {
  const location: GeoLocationMongoDB = {
    type: 'Point',
    // @ts-ignore
    coordinates: [(property.geo as GeoLocation).longitude, (property.geo as GeoLocation).latitude],
  };
  return location;
};

export const find = async (paginationQuery: PaginationQuery): Promise<ResponsePagination<PropertyModel>> => {
  // Run the Query
  const totalCount = await Property.estimatedDocumentCount();

  let query = Property.find();

  const items = await query.sort(paginationQuery.sort).skip(paginationQuery.skip).limit(paginationQuery.limit).exec();

  return {
    items,
    totalCount,
  };
};

export const getById = async (id: string): Promise<PropertyModel> => {
  const property = await Property.findById(id);

  if (!property) {
    throw 'Could not find the Property with de given ID';
  }

  return property;
};

export const create = async (property: PropertyModel): Promise<PropertyModel> => {
  // @ts-ignore
  if (property.geo && (property.geo as GeoLocation).latitude && (property.geo as GeoLocation).longitude) {
    property.geo = formatLocation(property);
  }
  const newProperty = await new Property(property).save();
  return newProperty;
};

export const update = async (id: string, property: PropertyModel): Promise<PropertyModel> => {
  const updateProperty = await Property.findByIdAndUpdate(id, property, {
    new: true,
  });

  if (!updateProperty) throw 'Property does not exists';

  return updateProperty;
};

export const deleteById = async (id: string): Promise<PropertyModel> => {
  const property = await Property.findByIdAndDelete(id);

  if (!property) throw 'The current Property does not exists';

  return property;
};
