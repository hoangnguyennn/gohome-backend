import { DataListSortDirection } from '~/interfaces';

export const DATA_LIST_LIMIT_DEFAULT = 0;

export const DATA_LIST_OFFSET_DEFAULT = 0;

export const DATA_LIST_SORT_BY_DEFAULT = null;

export const DATA_LIST_SORT_DIRECTION_DEFAULT: DataListSortDirection = 'ascend';

export const LIST_OF_FIELDS_AND_SORT_FIELDS = [
  {
    field: 'district',
    sortField: 'district.name'
  },
  {
    field: 'createdBy',
    sortField: 'createdBy.fullName'
  }
];

export const TRUE_STRING = 'true';
export const FALSE_STRING = 'false';

export const DATA_TYPES = {
  BOOLEAN: 'boolean'
};
