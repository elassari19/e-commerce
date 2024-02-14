'use client'

import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import brand from '@/public/brand.webp'
import { Input } from '../ui/input'
import { useDispatch } from 'react-redux'
import { decrementQuantity } from '../../store/cartSlice'

interface Props {}

const BasketCard = ({  }: Props) => {
  const dispatch = useDispatch()
  dispatch(decrementQuantity({ id: 1 }))

  return (
    <div className='text-black col-span-12'>
      {
        Array(4).fill({ img: brand, title: "test", subtitle: "sub test", price: 50, quantity: 1 })
          .map(({ img, title, subtitle, price, quantity }, idx) => (
            <div className='w-full flex gap-2 hover:bg-gray-100 p-4 text-sm' key={idx}>
              <Image src={img} alt='app brand' width={100} height={50} className='h-8 w-8 mx-2 rounded-full' />
              <div className='w-full'>
                <h5 className='font-bold'>{title}</h5>
                <h6 className='font-simebold text-gray-400'>{subtitle}</h6>
                <div className='flex justify-between items-center'>
                  <h5 className='font-bold text-xl'>{price}</h5>
                  <div className='flex gap-2 h-8'>
                    <button className='bg-primary text-white px-2 rounded-sm'>+</button>
                    <Input type='number' value={quantity} className=' px-2 rounded-sm w-12' />
                    <button className='bg-primary text-white px-2 rounded-sm'>-</button>
                  </div>
                  <Trash2 size={22} className='font-thin text-destructive cursor-pointer' />
                </div>
              </div>
            </div>
        ))}
      
    </div>
  )
}

export default BasketCard