import User from '~/models/user.model';

const UserService = {
  getList: () => {
    return User.find();
  }
};

export default UserService;
