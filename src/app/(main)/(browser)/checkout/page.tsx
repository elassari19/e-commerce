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
  const total = (carte.items.reduce((acc, item) => acc + (+item.price * item.qty), 0)/100).toFixed(2)

  return (
    <div className='grid grid-cols-12 bg-black/5'>
      <div className='col-span-12 lg:col-span-10 lg:col-start-2 grid grid-cols-8 gap-2 my-4'>
        <div className='col-span-12 md:col-span-5 flex flex-col gap-2'>
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

          <section className='rounded bg-white overflow-hidden'>
            {carte.items.map((item, index) => (
              <div key={index}
                className='flex items-start gap-4 p-4 w-[100%]'
              >
                <Image
                  src={item.images[0].secure_url} alt={item.name}
                  width={40} height={40}
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
            ))}
          </section>
        </div>

        <aside className='col-span-12 md:col-span-3 flex flex-col gap-2'>
          <section className='p-4 rounded bg-white font-semibold'>
            <h2 className='text-xl'>Summary</h2>
            <div className='flex flex-col gap-2 my-4'>
              <div className='flex justify-between items-center'>
                <p className='text-sm'>Subtotal</p>
                <p>{total}$</p>
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-sm'>Shipping fee</p>
                <p>{(+total*0.25).toFixed(2)}$</p>
              </div>

              <div className='flex justify-between items-start'>
                <p className='text-sm'>Total</p>
                <div className='flex flex-col items-end'>
                  <p>{(+total + (+total*0.25)).toFixed(2)}$</p>
                  <p className='text-xs text-black/30'>Inclusive of VAT</p>
                </div>
              </div>
            </div>
            <Button
              variant="primary" className='rounded-full'
              href=''
            >
              Pay Now ({carte.items.length})
            </Button>
          </section>

          <section className='p-4 rounded bg-white font-semibold'>
            <h3 className='text-xl'>Pay with</h3>
            <div className='flex flex-wrap gap-2 items-center mt-4 mb-6'>
              {
                [
                  'https://res.cloudinary.com/elassari/image/upload/v1714586784/my-ecom-app/assets/k0h0dwxayekvpmeurfh3.webp',
                  'https://res.cloudinary.com/elassari/image/upload/v1714586784/my-ecom-app/assets/celbn54m67unmf4u1lvs.webp',
                  'https://res.cloudinary.com/elassari/image/upload/v1714586784/my-ecom-app/assets/gatgwyubmm7x34govpmd.webp',
                  'https://res.cloudinary.com/elassari/image/upload/v1714586784/my-ecom-app/assets/my6z2fvfoidedkkkay09.webp',
                  'https://res.cloudinary.com/elassari/image/upload/v1714586783/my-ecom-app/assets/a2dujufsvaumuhtbiwo3.webp',
                  'https://res.cloudinary.com/elassari/image/upload/v1714586783/my-ecom-app/assets/elkqaycvaynhapfqngp4.webp',
                ].map((img, idx) => (
                  <Image
                    key={idx} src={img} alt="imag src" className='h-8'
                    width={idx == 4 ?100:50} height={50}
                  />
                ))
              }
            </div>
            <h3 className='text-xl'>Buyer protection</h3>
            <div className='flex gap-2 my-4'>
              <Image
                src='https://res.cloudinary.com/elassari/image/upload/v1714586784/my-ecom-app/assets/goiidyjuuvtaahavbkdc.webp'
                alt='secure payment' width={100} height={50} className='w-6 h-6'
              />
              <p> Get full refund if the item is not as described or if is not delivered</p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default page