import Link from 'next/link';
import ToggleMenuNav from '../modals/ToggleMenuNav';
import SearchProductsInput from '../inputs/SearchProductsInput';
import Image from 'next/image';
import UserAuth from '../auth/UserAuth';
import MotionSlide from '../framerMotion/MotionSlide';
import { getAuthSession } from '../../lib/getAuthSession';
import Dropdown from '../DropdownMenu';
import { Bell, Loader2Icon, ShoppingBasket, ShoppingCartIcon, User2 } from 'lucide-react';
import DialogCart from '../modals/DialogCart';
import BasketCard from '../cards/BasketCard';
import { CartBadge } from '../reduxtHandler/CartActions';
import DialogPopup from '../DialogPopup';
import Signin from '../forms/Signin';
import { brand } from '../../assets/brand';
import { Suspense } from 'react';
import SearchProductsNav from './SearchProductsNav';

interface Props {
  children: React.ReactNode
}

const HeaderNav = async ({ children }: Props) => {
  const session = await getAuthSession()

  return (
    <header className="relative mx-2 md:container md:mx-auto pt-4 pb-2">
      <MotionSlide top={10}>
        <nav className="flex justify-between items-center gap-4 md:gap-24">
          <div>
            <Link href="/">
              <Image src={brand} alt='app brand' width={100} height={50}  className='h-8 w-8' />
            </Link>
          </div>

          <SearchProductsInput>
            <MotionSlide bottom={10} className="absolute top-12 max-h-48 w-full overflow-auto shadow-md">
              <Suspense fallback={
                <div className="h-48 flex justify-center items-center">
                <Loader2Icon className='h-16 w-16 animate-spin text-primary' />
                </div>
              }>
                {children}
              </Suspense>
            </MotionSlide>
          </SearchProductsInput>

          <ToggleMenuNav />

          <ul className='hidden md:flex gap-4'>
            <li className='text-white font-bold relative' title={"Notification"}>
              <CartBadge type="notification"/>
              <Dropdown
                menuTrigger={<Bell size={25} />}
                menuContent={
                  Array(4).fill("notification id").map((item, idx) => (
                    <li key={idx} className='text-sm list-none' title="Notification">
                      <Link href={`/notification/${item.id}`}>Notification</Link>
                    </li>
                  ))
                }
              />
            </li>
              
            <li>
              <DialogCart
                sheetHeader={
                  <div className='bg-primary text-white flex gap-4 p-6 py-8 font-semibold'>
                    <ShoppingCartIcon size={24} /> <span>Shopping Cart</span>
                  </div>
                }
                sheetTrigger={
                  <div className='flex gap-2 relative cursor-pointer'>
                    <CartBadge type="cart"/>
                    <ShoppingBasket size={25}/> <span className='md:hidden font-semibold'>Shopping Cart</span>
                  </div>
                }
                sheetContent={<BasketCard />}
                className="w-full md:w-1/4"
                colors="secondary"
              />
            </li>

            <li>
              {session?.user ? <UserAuth /> : (
                <DialogPopup
                  dialogTrigger={<User2 size={25} />}
                  dialogTitle="User Authentication"
                  className='w-96 md:w-1/2 lg:w-1/3'
                  dialogContent={<Signin />}
                />
              )}
            </li>
          </ul>
        </nav>
      </MotionSlide>
    </header>
  );
};

export default HeaderNav;