import { ERROR_MESSAGES } from '~/constants/errorMessages';
import { HttpError, HTTP_STATUS } from '~/helpers/commonResponse';
import User from '~/models/user.model';
import bcryptUtil from '~/utils/bcrypt.util';
import { isObjectId } from '~/utils/common.util';
import tokenUtil from '~/utils/token.util';

const AuthService = {
  register: async (username: string, password: string) => {
    const user = await User.findOne({ username }).exec();

    if (user) {
      throw new HttpError(
        ERROR_MESSAGES.USER_ALREADY_EXIST,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const hashedPassword = await bcryptUtil.getHashed(password);
    const newUser = await User.create({ username, password: hashedPassword });

    const token = tokenUtil.generateToken({ userId: newUser._id.toString() });
    return { token };
  },
  login: async (username: string, password: string) => {
    const user = await User.findOne({ username }).exec();

    if (!user) {
      throw new HttpError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (!bcryptUtil.equal(password, user.password)) {
      throw new HttpError(
        ERROR_MESSAGES.INCORRECT_USERNAME_OR_PASSWORD,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const token = tokenUtil.generateToken({ userId: user._id.toString() });
    return { token };
  },
  me: async (userId: string) => {
    if (!isObjectId(userId)) {
      throw new HttpError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    const user = await User.findById(userId).exec();

    if (!user) {
      throw new HttpError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return user;
  }
};

export default AuthService;
