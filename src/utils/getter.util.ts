import {
  DATA_LIST_LIMIT_DEFAULT,
  DATA_LIST_OFFSET_DEFAULT,
  DATA_LIST_SORT_BY_DEFAULT,
  DATA_LIST_SORT_DIRECTION_DEFAULT
} from '~/constants';
import { DataListSortDirection, Nullable } from '~/interfaces';

export const getLimit = (limit: number): number => {
  return getValue(limit, DATA_LIST_LIMIT_DEFAULT);
};

export const getOffset = (offset: number): number => {
  return getValue(offset, DATA_LIST_OFFSET_DEFAULT);
};

export const getSortDirection = (direction: DataListSortDirection) => {
  if (getValue(direction, DATA_LIST_SORT_DIRECTION_DEFAULT) === 'descend') {
    return -1;
  }

  return 1;
};

export const getSortBy = (sortBy: string): Nullable<string> => {
  return getValue(sortBy, DATA_LIST_SORT_BY_DEFAULT);
};

export const getValue = <T>(value: T, defaultValue?: T) => {
  return value ?? defaultValue;
};
