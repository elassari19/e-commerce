'use client';

import SignIn from './SignIn';
import SignOut from './SignOut';
import { useSession } from 'next-auth/react';
import { cn } from '../../lib/utils';
import Dropdown from '../DropdownMenu';
import avatar from '@/assets/avatar.png';
import Image from 'next/image';
import { Edit2 } from 'lucide-react';
import Typography from '../layout/typography';
import Link from 'next/link';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuth = ({ className }: Props) => {
  const session = useSession();

  return (
    <>
      {!session.data ? (
        <SignIn className={cn(className)} />
      ) : (
        <Dropdown
          menuTrigger={
            <Image
              src={avatar}
              alt="user avatar"
              width={40}
              height={40}
              className="w-8 h-8 rounded-full"
            />
          }
          menuContent={[
            <Link
              href={`/profile`}
              className="flex gap-4 items-center"
              key="profile"
            >
              <Edit2 size={16} />
              <Typography>Edit Profile</Typography>
            </Link>,
            <SignOut className={cn(className)} key="signout" />,
          ]}
          className="w-40"
        />
      )}
    </>
  );
};

export default UserAuth;
