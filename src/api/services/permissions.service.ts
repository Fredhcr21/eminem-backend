import { Helpers } from '../../helpers';
import { Permission, PermissionModel } from '../models';
import { ResponsePagination } from '../types';
import { PaginationQuery } from '../types';
import { PermissionFilter } from '../types';

const getFiltersQuery = (queryParam: PermissionFilter): Record<string, string> => {
  let filters = {};
  const orQuery = [];

  if (queryParam) {
    const query = queryParam;

    if (query.title) {
      const filter = {
        title: Helpers.utils.stringToRegex(query.title),
      };
      orQuery.push(filter);
    }

    if (query.name) {
      const filter = {
        title: Helpers.utils.stringToRegex(query.name),
      };
      orQuery.push(filter);
    }

    if (orQuery.length > 0) {
      filters = {
        $or: orQuery,
      };
    }
  }
  return filters;
};

export const find = async (
  filter: PermissionFilter,
  paginationQuery: PaginationQuery,
): Promise<ResponsePagination<PermissionModel>> => {
  // Run Query
  const totalCount = await Permission.estimatedDocumentCount();

  const items = await Permission.find(getFiltersQuery(filter))
    .populate('childrens')
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();

  return {
    items,
    totalCount,
  };
};
