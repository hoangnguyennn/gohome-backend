import { DistrictTypes } from '~/interfaces/enums';
import mongoose from '~/loaders/mongoose';
import categoryModel from '~/models/category.model';
import districtModel from '~/models/district.model';
import wardModel from '~/models/ward.model';

const categories = [
  { name: 'Căn hộ', code: 'CH' },
  { name: 'Căn hộ studio', code: 'STU' },
  { name: 'Nhà nguyên căn', code: 'NNC' },
  { name: 'Nhà thục', code: 'NT' },
  { name: 'Villa, biệt thực', code: 'VIL' },
  { name: 'Nhà ở, kinh doanh', code: 'NOK' },
  { name: 'Mặt bằng chung chủ', code: 'MBC' },
  { name: 'Mặt bằng riêng biệt', code: 'MBR' },
  { name: 'Kho xưởng', code: 'KX' }
];

const districts = [
  { name: 'Nha Trang', type: DistrictTypes.THANH_PHO },
  { name: 'Cam Ranh', type: DistrictTypes.THANH_PHO },
  { name: 'Ninh Hòa', type: DistrictTypes.THI_XA },
  { name: 'Vạn Ninh', type: DistrictTypes.HUYEN },
  { name: 'Diên Khánh', type: DistrictTypes.HUYEN },
  { name: 'Khánh Sơn', type: DistrictTypes.HUYEN },
  { name: 'Khánh Vĩnh', type: DistrictTypes.HUYEN },
  { name: 'Cam Lâm', type: DistrictTypes.HUYEN },
  { name: 'Trường Sa', type: DistrictTypes.HUYEN }
];

const wards = [
  {
    name: 'Vĩnh Hòa',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Vĩnh Hải',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Vĩnh Phước',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Ngọc Hiệp',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Vĩnh Thọ',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Xương Huân',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Vạn Thắng',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Vạn Thạnh',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Phương Sài',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Phương Sơn',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Phước Hải',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Phước Tân',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Lộc Thọ',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Phước Tiến',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Tân Lập',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Phước Hòa',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Vĩnh Nguyên',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Phước Long',
    type: 'Phường',
    district: 'Nha Trang'
  },
  {
    name: 'Vĩnh Trường',
    type: 'Phường',
    district: 'Nha Trang'
  },
  { name: 'Vĩnh Lương', type: 'Xã', district: 'Nha Trang' },
  { name: 'Vĩnh Phương', type: 'Xã', district: 'Nha Trang' },
  { name: 'Vĩnh Ngọc', type: 'Xã', district: 'Nha Trang' },
  { name: 'Vĩnh Thạnh', type: 'Xã', district: 'Nha Trang' },
  { name: 'Vĩnh Trung', type: 'Xã', district: 'Nha Trang' },
  { name: 'Vĩnh Hiệp', type: 'Xã', district: 'Nha Trang' },
  { name: 'Vĩnh Thái', type: 'Xã', district: 'Nha Trang' },
  { name: 'Phước Đồng', type: 'Xã', district: 'Nha Trang' },
  {
    name: 'Cam Nghĩa',
    type: 'Phường',
    district: 'Cam Ranh'
  },
  {
    name: 'Cam Phúc Bắc',
    type: 'Phường',
    district: 'Cam Ranh'
  },
  {
    name: 'Cam Phúc Nam',
    type: 'Phường',
    district: 'Cam Ranh'
  },
  {
    name: 'Cam Lộc',
    type: 'Phường',
    district: 'Cam Ranh'
  },
  {
    name: 'Cam Phú',
    type: 'Phường',
    district: 'Cam Ranh'
  },
  {
    name: 'Ba Ngòi',
    type: 'Phường',
    district: 'Cam Ranh'
  },
  {
    name: 'Cam Thuận',
    type: 'Phường',
    district: 'Cam Ranh'
  },
  {
    name: 'Cam Lợi',
    type: 'Phường',
    district: 'Cam Ranh'
  },
  {
    name: 'Cam Linh',
    type: 'Phường',
    district: 'Cam Ranh'
  },
  {
    name: 'Cam Thành Nam',
    type: 'Xã',
    district: 'Cam Ranh'
  },
  {
    name: 'Cam Phước Đông',
    type: 'Xã',
    district: 'Cam Ranh'
  },
  {
    name: 'Cam Thịnh Tây',
    type: 'Xã',
    district: 'Cam Ranh'
  },
  {
    name: 'Cam Thịnh Đông',
    type: 'Xã',
    district: 'Cam Ranh'
  },
  { name: 'Cam Lập', type: 'Xã', district: 'Cam Ranh' },
  { name: 'Cam Bình', type: 'Xã', district: 'Cam Ranh' },
  { name: 'Cam Tân', type: 'Xã', district: 'Cam Lâm' },
  { name: 'Cam Hòa', type: 'Xã', district: 'Cam Lâm' },
  { name: 'Cam Hải Đông', type: 'Xã', district: 'Cam Lâm' },
  { name: 'Cam Hải Tây', type: 'Xã', district: 'Cam Lâm' },
  { name: 'Sơn Tân', type: 'Xã', district: 'Cam Lâm' },
  { name: 'Cam Hiệp Bắc', type: 'Xã', district: 'Cam Lâm' },
  {
    name: 'Cam Đức',
    type: 'Thị trấn',
    district: 'Cam Lâm'
  },
  { name: 'Cam Hiệp Nam', type: 'Xã', district: 'Cam Lâm' },
  { name: 'Cam Phước Tây', type: 'Xã', district: 'Cam Lâm' },
  { name: 'Cam Thành Bắc', type: 'Xã', district: 'Cam Lâm' },
  { name: 'Cam An Bắc', type: 'Xã', district: 'Cam Lâm' },
  { name: 'Cam An Nam', type: 'Xã', district: 'Cam Lâm' },
  { name: 'Suối Cát', type: 'Xã', district: 'Cam Lâm' },
  { name: 'Suối Tân', type: 'Xã', district: 'Cam Lâm' },
  {
    name: 'Vạn Giã',
    type: 'Thị trấn',
    district: 'Vạn Ninh'
  },
  { name: 'Đại Lãnh', type: 'Xã', district: 'Vạn Ninh' },
  { name: 'Vạn Phước', type: 'Xã', district: 'Vạn Ninh' },
  { name: 'Vạn Long', type: 'Xã', district: 'Vạn Ninh' },
  { name: 'Vạn Bình', type: 'Xã', district: 'Vạn Ninh' },
  { name: 'Vạn Thọ', type: 'Xã', district: 'Vạn Ninh' },
  { name: 'Vạn Khánh', type: 'Xã', district: 'Vạn Ninh' },
  { name: 'Vạn Phú', type: 'Xã', district: 'Vạn Ninh' },
  { name: 'Vạn Lương', type: 'Xã', district: 'Vạn Ninh' },
  { name: 'Vạn Thắng', type: 'Xã', district: 'Vạn Ninh' },
  { name: 'Vạn Thạnh', type: 'Xã', district: 'Vạn Ninh' },
  { name: 'Xuân Sơn', type: 'Xã', district: 'Vạn Ninh' },
  { name: 'Vạn Hưng', type: 'Xã', district: 'Vạn Ninh' },
  {
    name: 'Ninh Hiệp',
    type: 'Phường',
    district: 'Ninh Hòa'
  },
  { name: 'Ninh Sơn', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Tây', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Thượng', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh An', type: 'Xã', district: 'Ninh Hòa' },
  {
    name: 'Ninh Hải',
    type: 'Phường',
    district: 'Ninh Hòa'
  },
  { name: 'Ninh Thọ', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Trung', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Sim', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Xuân', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Thân', type: 'Xã', district: 'Ninh Hòa' },
  {
    name: 'Ninh Diêm',
    type: 'Phường',
    district: 'Ninh Hòa'
  },
  { name: 'Ninh Đông', type: 'Xã', district: 'Ninh Hòa' },
  {
    name: 'Ninh Thủy',
    type: 'Phường',
    district: 'Ninh Hòa'
  },
  { name: 'Ninh Đa', type: 'Phường', district: 'Ninh Hòa' },
  { name: 'Ninh Phụng', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Bình', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Phước', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Phú', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Tân', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Quang', type: 'Xã', district: 'Ninh Hòa' },
  {
    name: 'Ninh Giang',
    type: 'Phường',
    district: 'Ninh Hòa'
  },
  { name: 'Ninh Hà', type: 'Phường', district: 'Ninh Hòa' },
  { name: 'Ninh Hưng', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Lộc', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Ích', type: 'Xã', district: 'Ninh Hòa' },
  { name: 'Ninh Vân', type: 'Xã', district: 'Ninh Hòa' },
  {
    name: 'Khánh Vĩnh',
    type: 'Thị trấn',
    district: 'Khánh Vĩnh'
  },
  { name: 'Khánh Hiệp', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Khánh Bình', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Khánh Trung', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Khánh Đông', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Khánh Thượng', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Khánh Nam', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Sông Cầu', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Giang Ly', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Cầu Bà', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Liên Sang', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Khánh Thành', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Khánh Phú', type: 'Xã', district: 'Khánh Vĩnh' },
  { name: 'Sơn Thái', type: 'Xã', district: 'Khánh Vĩnh' },
  {
    name: 'Diên Khánh',
    type: 'Thị trấn',
    district: 'Diên Khánh'
  },
  { name: 'Diên Lâm', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Điền', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Xuân', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Sơn', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Đồng', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Phú', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Thọ', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Phước', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Lạc', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Tân', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Hòa', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Thạnh', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên Toàn', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Diên An', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Bình Lộc', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Suối Hiệp', type: 'Xã', district: 'Diên Khánh' },
  { name: 'Suối Tiên', type: 'Xã', district: 'Diên Khánh' },
  {
    name: 'Tô Hạp',
    type: 'Thị trấn',
    district: 'Khánh Sơn'
  },
  { name: 'Thành Sơn', type: 'Xã', district: 'Khánh Sơn' },
  { name: 'Sơn Lâm', type: 'Xã', district: 'Khánh Sơn' },
  { name: 'Sơn Hiệp', type: 'Xã', district: 'Khánh Sơn' },
  { name: 'Sơn Bình', type: 'Xã', district: 'Khánh Sơn' },
  { name: 'Sơn Trung', type: 'Xã', district: 'Khánh Sơn' },
  { name: 'Ba Cụm Bắc', type: 'Xã', district: 'Khánh Sơn' },
  { name: 'Ba Cụm Nam', type: 'Xã', district: 'Khánh Sơn' },
  {
    name: 'Trường Sa',
    type: 'Thị trấn',
    district: 'Trường Sa'
  },
  { name: 'Song Tử Tây', type: 'Xã', district: 'Trường Sa' },
  { name: 'Sinh Tồn', type: 'Xã', district: 'Trường Sa' }
];

const init = async () => {
  console.log('connect to db');
  await mongoose();
  console.log('db connected');

  console.log('create categories');
  await categoryModel.create(categories);
  console.log('create categories done');

  console.log('create districts');
  const districtsCreated = await districtModel.create(districts);
  console.log('create districts done');

  console.log('create wards');
  const newWards = wards.map(ward => {
    return {
      name: ward.name,
      type: ward.type,
      districtId: districtsCreated.find(
        district => district.name === ward.district
      )._id
    };
  });
  await wardModel.create(newWards);
  console.log('create wards done');
};

init();
