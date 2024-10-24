'use client';

import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import Typography from '../layout/typography';
import { cn } from '../../lib/utils';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const SignOut = ({ className }: Props) => {
  return (
    <Button onClick={() => signOut()} size="sm" className={cn('w-full')}>
      <LogOut size={24} className={cn('', className)} />
      <Typography variant="h5">Sign Out</Typography>
    </Button>
  );
};

export default SignOut;
