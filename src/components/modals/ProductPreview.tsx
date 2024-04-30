'use client'

import React, { useEffect, useState } from 'react'
import DialogPopup from '../DialogPopup'
import { Plus, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { PreviewTabs, Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { db } from '@/lib/db'
import { Button } from '../ui/button'
import CartActions, { CartInput } from '../reduxtHandler/CartActions'
import { auth } from '@/lib/getAuthSession'
import Link from 'next/link'
import Signin from '../forms/Signin'
import FavoriteAction from '../reduxtHandler/FavoriteAction'
import ImageMagnify from '../cards/ImageMagnify'
import Ratings from '../atoms/Ratings'
import { cn } from '@/lib/utils'
import { ratings } from '@/helpers/methods/functions'
import { useSession } from 'next-auth/react'
import { IProductData } from '../../types/products'
import { getProductById } from '../../helpers/actions/Products'

interface Props extends React.HTMLAttributes<HTMLDivElement>{
  product: IProductData
  dialogTrigger?: React.ReactNode
}

const ProductPreview = ({ product, dialogTrigger, className }: Props) => {
  const { data } = useSession()

  if (!product) return <div>d</div>

  return (
    <DialogPopup
      className={cn('w-[96%]')}
      dialogTrigger={
        dialogTrigger||<div className={cn('cursor-pointer relative', className)}>
          <ShoppingCart size={40} className='w-11 h-11 text-primary rounded-full p-1 bg-primary/10' />
          <span className='absolute right-1 top-2 w-6 pl-1 bg-[#e6f0e4]'>
            <Plus size={14} strokeWidth={4} className='text-primary' />
          </span>
        </div>
      }
      dialogContent={
        <div className='grid grid-cols-12 gap-4 h-[30rem]'>
          {/* product overview images */}
          <div className='col-span-4'>
            <Tabs defaultValue={"pro2"} className="w-full h-full">
              <div>
              {
                [...product?.images, ...product?.properties.filter((p)=>p.secure_url)].map((pro, idx) => (
                  <TabsContent key={idx} value={pro+idx.toString()} className="mb-4 w-full h-full" >
                    <ImageMagnify src={pro.secure_url!} />
                  </TabsContent>
                ))
              }
              </div>
              <div className='w-full overflow-auto'>
                <TabsList className="h-full justify-start p-0">
                {
                    [...product.images, ...product.properties.filter((p)=>p.secure_url)].map((pro, idx) => (
                      <TabsTrigger key={idx} value={pro+idx.toString()}
                        className="w-20 h-20 p-1 rounded-lg data-[state=active]:bg-primary/50"
                      >
                        <Image
                          src={pro.secure_url!} alt="product"
                          width={40} height={40}
                          className='w-full h-full rounded-lg transform transition-transform duration-300 ease-in-out'
                          loading="lazy"
                        />
                      </TabsTrigger>
                    ))
                  }
              </TabsList>
              </div>
            </Tabs>
          </div>

          {/* product details */}
          <div className='col-span-5 flex flex-col gap-4 h-full overflow-auto p-2'>
            <div className='w-full bg-primary px-4 py-2 rounded-lg'>
              <h2 className='text-xl font-bold text-white'>{product.name.toUpperCase()}</h2>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='text-primary font-bold text-2xl'>{(+product.price)/100} $</p>
              <p className='text-xs text-black/70'>Price includes VAT</p>
            </div>

            <p className='font-bold px-2'>{product.description}</p>

            {/* reviews */}
            <div className='flex items-center gap-4 text-sm font-bold'>
              <Ratings ratings={ratings(product.reviews)} />
              {/* <div className='flex gap-1'>{Array(5).fill("").map((_, idx)=>(
                <StarIcon key={idx} size={20} fill={idx<2?'black':'white'} className={"font-thin"} />
              ))}</div>
              <span> {ratings || 0} Rating</span> */}
              <span>{product.reviews.length} Reviews</span>
              <span>{product.sold || 0} Sold</span>
            </div>
            <hr className='border border-primary/70 my-2' />

            {/* product colors and size */}
            <div className='flex flex-col gap-2'>
              {/* images tags */}
              <PreviewTabs
                tabList={
                  product.properties.filter((property) => property.color?.length! > 0 && property)
                  .map((property) => (
                    <CartActions
                      key={property.color}
                      product={product}
                      productColor={property.color!}
                    >
                      <Image
                        src={property.secure_url!} alt="product" loading="lazy"
                        width={40} height={40}
                        className="w-16 h-full bg-white"
                      />
                    </CartActions>
                  ))
                }
                tabContent={
                  product.properties.filter((property) => property.color?.length! > 0 && property)
                  .map((property) => (
                      <p key={property.color} className="text-bold"><strong>Color</strong>: {property.color}</p>
                  ))
                }
                properties={product.tags}
              />

              {/* size tags */}
              <PreviewTabs
                tabList={
                  product.properties.filter((property) => property.name == "size" && property)
                  .map((property) => property.value!)[0]?.split(",")
                  .map((size) => (
                    <CartActions
                      key={size} className='w-full h-full py-4'
                      product={product}
                      productSize={size}
                    >
                      <p className="text-bold"><strong>{size}</strong></p>
                    </CartActions>
                  ))
                }
                tabContent={
                  product.properties.filter((property) => property.name == "size" && property)
                  .map((property) => property.value!)[0]?.split(",")
                  .map((size) => (
                    <p key={size} className="text-bold"><strong>Size</strong>: {size}</p>
                  ))
                }
                properties={product.tags}
              />
            </div>

            <hr className='border border-primary/70 my-2' />
          </div>

          {/* product order */}
          <div className='col-span-3 border flex flex-col gap-2 p-4 font-bold rounded-lg'>
            <h2>Delivery</h2>
            <h3>Free shipping </h3>
            <p><span className='text-primary'>8-day delivery</span> by Apr 12</p>
            <hr className='border border-primary/70 my-2' />
            <h2>Service</h2>
            <p className='text-primary'>Free returns · Delivery Guarantee</p>
            <hr className='border border-primary/70 my-2' />
            {/* select quantity */}
            <h2>Quantity</h2>
            <div className='flex gap-4 p-2 h-12'>
              {/* merge redux action with server component */}
              <CartActions decrement product={product}>
                <Button size="sm" variant="primary-outline" className='rounded-full px-3'>-</Button>
              </CartActions>
              <CartInput product={product} />
              <CartActions increment product={product}>
                <Button size="sm" variant="primary-outline" className='rounded-full px-3'>+</Button>
              </CartActions>
            </div>

            {/* checkout action */}
            <div className='my-2 w-full'>
              {data?.user ? (
                <Button variant="primary" className='rounded-full'>
                  <Link href={"/checkout"}>Checkout now</Link>
                </Button>
              ):(
                <DialogPopup
                  dialogTrigger={<Button variant="primary" className='rounded-full w-72'>
                    Checkout now
                  </Button>}
                  dialogContent={<Signin />}
                  className='w-96 md:w-1/2 lg:w-1/3'
                />
              )}
            </div>
            
            {/* implement details  add to favorite */}
            <div className='flex justify-between items-center gap-4'>
              <Button size="sm" variant="primary-outline" className='rounded-full py-5'>
                <Link href={`/products/${product.categoryId}/${product.id}`}>View Details</Link>
              </Button>
              <FavoriteAction productId={product.id} />
            </div>
          </div>
        </div>
      }
    />
  )
}

export default ProductPreview