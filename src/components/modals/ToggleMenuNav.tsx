'use client'

import React from 'react'
import DialogNav from '../DialogNav'
import { MenuIcon, User2 } from 'lucide-react'
import Brand from '../atoms/Brand'
import { list } from '../../helpers/constants/Categories'
import Link from 'next/link'
import UserAuth from '../auth/UserAuth'
import SignOut from '../auth/SignOut'

const ToggleMenuNav = () => {
  return (
    <div className='md:hidden'>
    <DialogNav
      className="max-h-full overflow-y-auto p-4 top-0 rigth-0 translate-y-[0%]"
      dialogTrigger={<User2 size={28} className="text-white" />}
      dialogHeader={<Brand className="border-b" />}
      dialogContent={<ul className='w-full h-full flex flex-col gap-4'>
        {
          [...list.map(({ href, Icon, title }, idx) => (
            <li key={idx} className='font-semibold group'>
              <Link href={href} className='flex items-center gap-2 group-hover:text-primary'>
                <Icon size={25} /> <span>{title}</span>
              </Link>
            </li>
          )),
          <li className='font-semibold group'>
            <UserAuth />
          </li>,
        ]
        }
      </ul>}
    />
  </div>

  )
}

export default ToggleMenuNav