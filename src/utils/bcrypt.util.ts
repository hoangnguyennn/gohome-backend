import bcrypt from 'bcrypt';
import env from '~/configs/env';

const getHashed = async (text: string) => {
  const saltRounds = Math.round(Math.random() * env.maxOfSalt);
  const hashed = await bcrypt.hash(text, saltRounds);
  return hashed;
};

const equal = async (text: string, hashed: string) => {
  const result = await bcrypt.compare(text, hashed);
  return result;
};

export default { getHashed, equal };
