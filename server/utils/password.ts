import { compare } from 'bcryptjs';

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await compare(password, hash);
};
