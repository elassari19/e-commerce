'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import Image from 'next/image'
import FavoriteAction from '@/components/reduxtHandler/FavoriteAction'
import { removeFromCart } from '@/store/cartSlice'
import { BaggageClaim, ShoppingBasket, Trash2 } from 'lucide-react'
import ProductQuantity from '@/components/reduxtHandler/ProductQuantity'
import CartActions from '../../../../components/reduxtHandler/CartActions'
import DialogPopup from '../../../../components/DialogPopup'
import { DialogClose } from '../../../../components/ui/dialog'

const page = () => {
  const dispatch = useDispatch()
  const carte = useSelector((state: RootState) => state.cart)

  return (
    <div className='grid grid-cols-12 bg-black/5'>
      <div className='col-span-12 lg:col-span-10 lg:col-start-2 grid grid-cols-8 gap-0 md:gap-2 my-4'>
        <div className='col-span-12 md:col-span-5 h-[10rem] flex flex-col gap-2'>
          <section className='p-4 rounded bg-white flex justify-between items-center'>
            <h2 className='text-xl font-bold flex-1'>Shopping Cart ({carte.items.length})</h2>
            <DialogPopup
              dialogTrigger={<div className=''>
                <Button size="sm" variant="outline-destructive" className='font-semibold text-sm w-auto px-4 border-none'>
                  <ShoppingBasket size={16} className='mr-1 text-destructive' />
                  Clear Carte
                </Button>
              </div>}
              dialogTitle='Confirm Clear Carte'
              dialogDescription={<div className='flex gap-8 items-center p-4 px-8'>
                <DialogClose>
                  <CartActions
                    removeAll product={carte.items[0]}
                    className='w-auto bg-transparent text-destructive cursor-pointer border border-destructive p-2 px-4 rounded hover:bg-destructive hover:text-white'
                  >
                    Delete selected items
                  </CartActions>
                </DialogClose>
                <DialogClose>
                  <Button variant="destructive" className='px-4 w-auto h-10'>Cancel</Button>
                </DialogClose>
              </div>}
              className='w-auto'
            />
          </section>

          <section className='p-4 rounded bg-white h-[100rem]'>
            {carte.items.map((item, index) => (
              <div key={index}
                className='flex items-start gap-4 p-4'
              >
                <Image
                  src={item.images[0].secure_url} alt={item.name}
                  width={40} height={40}
                  className='w-32 h-40 rounded-lg'
                />
                <div className='flex flex-col gap-2 flex-1'>
                  {/* product desc */}
                  <div className='flex items-center justify-between gap-1 flex-1'>
                    <h4 className='text-xs font-semibold text-ellipsis whitespace-nowrap overflow-hidden w-[27rem]'>{item.description}</h4>
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
            ))}
          </section>
        </div>
        <nav className='col-span-12 md:col-span-3 bg-black/40 h-[10rem]'></nav>
      </div>
    </div>
  )
}

export default page