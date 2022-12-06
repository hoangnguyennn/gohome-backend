import {
  DATA_LIST_LIMIT_DEFAULT,
  DATA_LIST_OFFSET_DEFAULT,
  DATA_LIST_SORT_BY_DEFAULT,
  DATA_LIST_SORT_DIRECTION_DEFAULT,
  LIST_OF_FIELDS_AND_SORT_FIELDS
} from '~/constants';
import { DataListSortDirection, Nullable } from '~/interfaces';

export const getIds = (categoryIds?: string | string[]) => {
  if (typeof categoryIds === 'string') {
    return [categoryIds];
  }

  if (Array.isArray(categoryIds)) {
    return categoryIds;
  }

  return [];
};

export const getLimit = (limit?: number): number => {
  return Number(getValue(limit, DATA_LIST_LIMIT_DEFAULT));
};

export const getOffset = (offset?: number): number => {
  return Number(getValue(offset, DATA_LIST_OFFSET_DEFAULT));
};

export const getSortDirection = (direction?: DataListSortDirection) => {
  if (getValue(direction, DATA_LIST_SORT_DIRECTION_DEFAULT) === 'descend') {
    return -1;
  }

  return 1;
};

export const getSortBy = (sortBy?: string): Nullable<string> => {
  const fieldInfo = LIST_OF_FIELDS_AND_SORT_FIELDS.find(
    item => item.field === sortBy
  );

  if (fieldInfo) return fieldInfo.sortField;
  return getValue(sortBy, DATA_LIST_SORT_BY_DEFAULT);
};

export const getValue = (value?: any, defaultValue?: any) => {
  return value ?? defaultValue;
};
