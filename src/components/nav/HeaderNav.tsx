import Link from 'next/link';
import ToggleMenuNav from '../modals/ToggleMenuNav';
import SearchProductsInput from '../inputs/SearchProductsInput';
import Image from 'next/image';
import brand from '@/public/brand.webp';
import UserAuth from '../auth/UserAuth';
import MotionSlide from '../framerMotion/MotionSlide';
import { getAuthSession } from '../../lib/getAuthSession';
import Dropdown from '../DropdownMenu';
import { Bell, ShoppingBasket, ShoppingCartIcon } from 'lucide-react';
import DialogCart from '../modals/DialogCart';
import BasketCard from '../cards/BasketCard';

const HeaderNav = async () => {
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

          <SearchProductsInput />

          <ToggleMenuNav />

          <ul className='hidden md:flex gap-4'>
            <li className='text-white font-bold' title={"Notification"}>
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
                    <div className='flex gap-2'>
                      <ShoppingBasket size={25}/> <span className='md:hidden font-semibold'></span>
                    </div>
                  }
                  sheetContent={<BasketCard />}
                  className="w-full md:w-1/4"
                  colors="secondary"
                />
              </li>

            {session?.user ? <UserAuth /> : null}
          </ul>
        </nav>
      </MotionSlide>
    </header>
  );
};

export default HeaderNav;