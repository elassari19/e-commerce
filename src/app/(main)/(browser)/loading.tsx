import React from 'react'
import SwiperSuspense from '@/components/suspense/SwiperSuspense'
import { Skeleton } from '@/components/ui/skeleton'

const loading = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full md:col-span-10 md:col-start-2 my-8">
        {/* categories */}
        <div className="col-span-full place-content-center">
          <h1 className="font-bold text-lg pl-2">
            Shop by categories
          </h1>
          <SwiperSuspense />
        </div>

        <div className="">
          <h2 className="col-span-full font-bold text-lg">
            Popular Products for Daily Shopping
          </h2>
          <Skeleton className='w-full h-2/3' />
        </div>
      </div>
    </div>
  )
}

export default loading