import { DataListSortDirection } from '~/interfaces';

export const DATA_LIST_LIMIT_DEFAULT = 0;

export const DATA_LIST_OFFSET_DEFAULT = 0;

export const DATA_LIST_SORT_BY_DEFAULT = null;

export const DATA_LIST_SORT_DIRECTION_DEFAULT: DataListSortDirection = 'ascend';

export const LIST_OF_FIELDS_AND_SORT_FIELDS = [
  {
    field: 'district',
    sortField: 'district.name'
  }
];
