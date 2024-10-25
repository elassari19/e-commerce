import { cn } from '@/lib/utils';
import Brand from '../atoms/Brand';
import MenuList from './MenuList';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  nav?: boolean;
}

const SideNavBar = ({ className, nav }: Props) => {
  return (
    <nav
      className={cn(
        'bg-white text-black/80 transition-all duration-200 flex flex-col p-2 gap-2 min-h-screen',
        className
      )}
    >
      <Brand nav={nav} />
      <MenuList nav={nav} />
    </nav>
  );
};

export default SideNavBar;
