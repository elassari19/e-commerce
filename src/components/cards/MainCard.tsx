import { cn } from '@/lib/utils';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const MainCard = ({ children, className }: Props) => {
  return (
    <div className={cn('bg-white p-4 rounded-xl border', className)}>
      {children}
    </div>
  );
};

export default MainCard;
