import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export const getAuthSession = async () => await getServerSession(authOptions);
export const auth = async (option: string) =>
  // @ts-ignore
  await getAuthSession().then((res) => res?.token[option]);
