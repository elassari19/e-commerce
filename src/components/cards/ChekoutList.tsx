'use client'

import React from 'react'
import Image from 'next/image'
import FavoriteAction from '../reduxtHandler/FavoriteAction'
import { removeFromCart } from '@/store/cartSlice'
import { BaggageClaim, Trash2 } from 'lucide-react'
import ProductQuantity from '../reduxtHandler/ProductQuantity'
import StoreContext from '../reduxtHandler/StoreContext'

type Props = {}

const ChekoutList = (props: Props) => {

  return (
    <StoreContext>
      {(store, dispatch) => (
        <>
        {
        store.cart.items.map((item, index) => (
          <div key={index}
            className='flex items-start gap-4 p-4 w-[100%]'
          >
            <Image
              src={item.images[0].secure_url} alt={item.name}
              width={40} height={40} loading="eager"
              className='w-32 h-40 rounded-lg'
            />
            <div className='flex flex-col gap-2 w-full'>
              {/* product desc */}
              <div className='flex items-center justify-between gap-1'>
                <h4 className='text-xs font-semibold w-[12rem] sm:w-[15rem] text-ellipsis whitespace-nowrap overflow-hidden'>{item.description}</h4>
                <div className='flex items-center justify-end gap-2'>
                  <FavoriteAction productId={item.id} className='w-6 h-8 p-0 border-none'/>
                  <div onClick={() => dispatch(removeFromCart(item))}>
                    <Trash2 size={26} className='font-thin text-destructive cursor-pointer p-1' />
                  </div>
                </div>
              </div>
              {/* product option selected options */}
              <div className='flex items-center justify-between'>
                <p className='text-sm font-semibold bg-black/10 rounded-full w-28 py-1 h-8 text-center'>{item?.color} - {item?.size}</p>
                <ProductQuantity product={item} />
              </div>
              <p className='font-bold'>{+item.price/100}$</p>
              <div className='flex gap-1 items-center'>
                <BaggageClaim size={14} className='text-primary' /> <span className='text-xs text-primary'>7-day delivery</span>
              </div>
            </div>
          </div>
        ))
        }
        </>
      )}
    </StoreContext>

  )
}

export default ChekoutList