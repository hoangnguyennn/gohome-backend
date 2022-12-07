import { ObjectId } from 'mongodb';
import {
  DATA_LIST_LIMIT_DEFAULT,
  DATA_LIST_OFFSET_DEFAULT,
  DATA_LIST_SORT_BY_DEFAULT,
  DATA_LIST_SORT_DIRECTION_DEFAULT,
  FALSE_STRING,
  LIST_OF_FIELDS_AND_SORT_FIELDS,
  TRUE_STRING
} from '~/constants';
import { DataListSortDirection, Nullable } from '~/interfaces';

export const getIds = (categoryIds?: string | string[]) => {
  if (typeof categoryIds === 'string' && ObjectId.isValid(categoryIds)) {
    return [new ObjectId(categoryIds)];
  }

  if (Array.isArray(categoryIds)) {
    return categoryIds.filter(ObjectId.isValid).map(id => new ObjectId(id));
  }

  return [];
};

export const getBoolean = (value?: any) => {
  if (value === TRUE_STRING) {
    return true;
  }

  if (value === FALSE_STRING) {
    return false;
  }

  return undefined;
};

export const getLimit = (limit?: number): number => {
  return Number(getValue(limit, DATA_LIST_LIMIT_DEFAULT));
};

export const getObjectId = (id?: string) => {
  if (ObjectId.isValid(String(id))) {
    return new ObjectId(id);
  }
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
