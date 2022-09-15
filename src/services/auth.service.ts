import User from '~/models/user.model';
import bcryptUtil from '~/utils/bcrypt.util';
import tokenUtil from '~/utils/token.util';

const AuthService = {
  login: async (username: string, password: string) => {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    if (!bcryptUtil.equal(password, user.hashedPassword)) {
      throw new Error('Password is incorrect');
    }

    const token = tokenUtil.generateToken({ userId: user._id.toString() });
    return { token };
  },
  register: async (username: string, password: string) => {
    const user = await User.findOne({ username });

    if (user) {
      throw new Error('User already exists');
    }

    const hashedPassword = bcryptUtil.getHashed(password);
    const newUser = await User.create({ username, hashedPassword });

    const token = tokenUtil.generateToken({ userId: newUser._id.toString() });
    return { token };
  },
};

export default AuthService;
