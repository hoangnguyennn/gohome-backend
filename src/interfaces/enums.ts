export enum CollectionNames {
  CATEGORY = 'categories',
  DISTRICT = 'districts',
  IMAGE = 'images',
  POST = 'posts',
  USER = 'users',
  WARD = 'wards'
}

export enum UserTypes {
  ROOT = 0,
  ADMIN = 1,
  EMPLOYEE = 2
}

export enum WardTypes {
  XA = 'Xã',
  PHUONG = 'Phường',
  THI_TRAN = 'Thị trấn'
}

export enum DistrictTypes {
  QUAN = 'Quận',
  HUYEN = 'Huyện',
  THANH_PHO = 'Thành phố',
  THI_XA = 'Thị xã'
}

export enum PostVerifyStatuses {
  PENDING = 1,
  APPROVED = 2,
  DENIED = 0
}
