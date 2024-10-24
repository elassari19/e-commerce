import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';
import { db } from './db';

export const getAuthSession = async () => {
  const res = await getServerSession(authOptions);
  if (res?.user?.email) {
    const user = await db.user.findUnique({
      where: { email: res.user.email },
    });
    if (user?.id) {
      return { ...user, password: null };
    }
  }
  return res;
};
export const auth = async (option: string) =>
  // @ts-ignore
  await getAuthSession().then((res) => res[option]);
