import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import Typography from '../layout/typography';
import { LucideIcon } from 'lucide-react';
import MainCard from './MainCard';

const Variants = cva('rounded-full p-4', {
  variants: {
    variant: {
      default: 'bg-transparent',
      orange: 'bg-orange-500/20 text-orange-500',
      info: 'bg-info/40 text-info',
      primary: 'bg-primary/20 text-primary',
      infoDark: 'bg-info/20 text-info-dark',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface Props
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof Variants> {
  Icon: LucideIcon;
  status: string;
  amount?: string | number;
  total: string | number;
}

const CardOrders = ({
  className,
  variant,
  Icon,
  status,
  amount,
  total,
}: Props) => {
  return (
    <MainCard className={cn('flex gap-4 p-4 items-center bg-white', className)}>
      <div className={cn('', Variants({ variant }))}>
        <Icon size={20} />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <Typography heading="p" variant="h5" className="text-black/60">
            {status}
          </Typography>
          {amount && (
            <Typography
              heading="p"
              variant="h6"
              className="text-red-600 font-semibold"
            >
              ({amount})
            </Typography>
          )}
        </div>
        <Typography heading="p" variant="h3" className="font-bold">
          {total}
        </Typography>
      </div>
    </MainCard>
  );
};

export default CardOrders;
