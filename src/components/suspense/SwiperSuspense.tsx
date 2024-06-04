import React from 'react'
import { Skeleton } from '../ui/skeleton'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}

const SwiperSuspense = ({  }: Props) => {
  return (
    <div className='grid grid-cols-10 gap-4 flex-nowrap mx-60 h-48'>
      {
        Array(5).fill('').map((_, idx) => (
          <Skeleton key={idx} className='h-48 rounded-lg col-span-2' />
        ))
      }
    </div>
  )
}

export default SwiperSuspense