'use client'

import { LucideShoppingBasket, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { decrementQuantity, incrementQuantity, removeFromCart } from '@/store/cartSlice'
import Link from 'next/link'
import { Button } from '../ui/button'

interface Props {}

const BasketCard = ({  }: Props) => {
  const basket = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

  const total = basket.reduce((acc, item) => acc + (+item.price * item.qty), 0)
  console.log('total', total)
  return (
    <div className='text-black col-span-12 flex flex-col h-[88vh]'>
      {
        basket.length > 0
          ? (
            <div className='h-full'>
            {
              basket
                .map((product, idx) => (
                  <div className='flex gap-2 hover:bg-gray-100 p-4 text-sm w-full' key={idx}>
                    <Image src={product.images?.[0].secure_url} loading="eager" priority={false} alt='product' width={100} height={50} className='h-8 w-8 mx-2 rounded-full' />
                    <div className='w-[85%]'>
                      <h5 className='font-bold'>{product.name}</h5>
                      <h6 className='font-simebold text-gray-400 truncate'>{product.description}</h6>
                      <div className='flex justify-between items-center'>
                        <h5 className='font-bold text-xl'>{+product.price/100}</h5>
                        <div className='flex gap-2 h-8'>
                          <div onClick={() => dispatch(decrementQuantity(product))}>
                            <button className='bg-primary text-white px-2 rounded-sm h-full'>-</button>
                          </div>
                          <Input
                            type='number' className=' px-2 rounded-sm w-12' value={product.qty}
                            onChange={(e) => dispatch(incrementQuantity({ ...product, value: +e.target.value }))}
                          />
                          <div onClick={() => dispatch(incrementQuantity(product))}>
                            <button className='bg-primary text-white px-2 rounded-sm h-full'>+</button>
                          </div>
                        </div>
                        <div onClick={() => dispatch(removeFromCart(product))}>
                          <Trash2 size={22} className='font-thin text-destructive cursor-pointer' />
                        </div>
                      </div>
                    </div>
                  </div>
              ))
            }
            </div>
          )
          : (
            <div className='h-[100vh] w-full flex flex-col justify-center items-center gap-4 p-8'>
              <LucideShoppingBasket size={100} className='text-primary' />
              <p className='text-sm font-bold text-center'>No items yet? Continue shopping to explore more.</p>
              <Button variant="primary" className='rounded-full'>
                <Link href="/">Explore items</Link>
              </Button>
            </div>
          )
      }
      <Link
        href='/checkout'
        className='bg-primary p-4 rounded-full m-4 text-white text-sm font-bold flex justify-between items-center'
      >
        Process To Checkout
        <span
          className='bg-white text-primary font-bold text-sm rounded-3xl block p-1 px-2'
        >
          ${total/100}
        </span>
      </Link>
    </div>
  )
}

export default BasketCard