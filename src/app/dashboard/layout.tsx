import { getAuthSession } from '../../lib/getAuthSession';
import HeaderSection from '@/components/nav/HeaderSection';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Design from './Design';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'App Dashboard',
};

const Layout = async ({ children }: Props) => {
  // todo: check the user role (admin/gest/user)
  const session = await getAuthSession();
  if (!session) {
    return redirect('/sign-in');
  }

  return (
    <Design>
      <HeaderSection />
      {children}
    </Design>
  );
};

export default Layout;
