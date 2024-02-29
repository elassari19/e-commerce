import Link from 'next/link';
import ToggleMenuNav from '../modals/ToggleMenuNav';
import SearchProductsInput from '../inputs/SearchProductsInput';
import Image from 'next/image';
import MotionSlide from '../framerMotion/MotionSlide';
import { getAuthSession } from '../../lib/getAuthSession';
import Dropdown from '../DropdownMenu';
import { Bell, ShoppingBasket, ShoppingCartIcon, User2 } from 'lucide-react';
import DialogCart from '../modals/DialogCart';
import BasketCard from '../cards/BasketCard';
import { CartBadge } from '../reduxtHandler/CartActions';
import DialogPopup from '../DialogPopup';
import Signin from '../forms/Signin';
import { brand } from '../../assets/brand';
import { db } from '../../lib/db';
import AllCategories from './AllCategories';
import { list } from '../../helpers/constants/Categories';
import UserAuth from '../auth/UserAuth';

interface Props {
}

const HeaderNav = async ({  }: Props) => {
  const session = await getAuthSession()
  const Categories = await db.category.findMany()

  return (
    <header className="relative mx-2 md:container md:mx-auto pt-4 pb-2">
      <MotionSlide top={10}>
        <nav className="flex justify-between items-center gap-4 md:gap-24">
          <div className='hidden md:block cursor-pointer'>
            <Link href="/">
              <Image src={brand} loading="lazy" alt='app brand' width={100} height={50}  className='h-8 w-8' />
            </Link>
          </div>

          {/* categories */}
          <AllCategories Categories={Categories} />

          <SearchProductsInput />

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
                className="w-full h-full md:w-2/5 lg:w-2/6 xl:w-1/4"
                colors="secondary"
              />
            </li>

            <li>
              <ul className=''>
                {session?.user
                  ? (
                    <Dropdown
                      menuTrigger={<User2 size={25} />}
                      menuContent={[...list.map(({ href, Icon, title }, idx) => (
                        <li key={idx} className='font-semibold group list-none'>
                          <Link href={href} className='flex items-center gap-2 group-hover:text-primary'>
                            <Icon size={25} /> <span>{title}</span>
                          </Link>
                        </li>
                      )),
                      <li key={"userauth"} className='font-semibold group list-none'>
                        <UserAuth className='flex items-center gap-2 group-hover:text-primary' />
                      </li>,
                      ]}
                      className='w-[14rem]'
                    />
                  )
                  : (
                  <DialogPopup
                    dialogTrigger={<User2 size={25} />}
                    dialogTitle="User Authentication"
                    className='w-96 md:w-1/2 lg:w-1/3'
                    dialogContent={<Signin />}
                  />
                )}
              </ul>
            </li>
          </ul>
        </nav>
      </MotionSlide>
    </header>
  );
};

export default HeaderNav;