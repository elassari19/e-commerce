import React from 'react'
import DialogPopup from '../DialogPopup'
import { ImageUrl, Product, Properties } from '@prisma/client'
import { Heart, Plus, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { CustomTabs, PreviewTabs, Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { db } from '../../lib/db'
import { Button } from '../ui/button'
import CartActions, { CartInput } from '../reduxtHandler/CartActions'
import { auth } from '../../lib/getAuthSession'
import Link from 'next/link'
import Signin from '../forms/Signin'
import FavoriteAction from '../reduxtHandler/FavoriteAction'

interface Props {
  productId: string
}

const ProductPreview = async ({ productId }: Props) => {
  const user = await auth("email")
  console.log("user", user)
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      images: true,
      properties: true,
    }
  }) as Product & { properties: (Properties&{images: ImageUrl[]})[], images: ImageUrl[] }

  return (
    <DialogPopup
      className='w-[96%]'
      dialogTrigger={
        <div className='cursor-pointer relative'>
          <ShoppingCart size={40} className='w-11 h-11 text-primary rounded-full p-1 bg-primary/10' />
          <span className='absolute right-1 top-2 w-6 pl-1 bg-[#e6f0e4]'>
            <Plus size={14} strokeWidth={4} className='text-primary' />
          </span>
        </div>
      }
      dialogContent={
        <div className='grid grid-cols-12 gap-4 h-[30rem]'>
          {/* product image */}
          <div className='col-span-4'>
            <Tabs defaultValue={"pro2"} className="w-full h-full">
              <div>
              {
                [...product.images, ...product.properties.filter((p)=>p.secure_url)].map((pro, idx) => (
                  <TabsContent key={idx} value={pro+idx.toString()} className="mb-4 w-full h-full" >
                    <Image
                      src={pro.secure_url!} alt="product"
                      width={40} height={40}
                      className='w-full h-[20rem] rounded-lg transform transition-transform duration-300 ease-in-out'
                      loading="lazy"
                    />
                  </TabsContent>
                ))
              }
              </div>
              <TabsList className="w-full overflow-auto justify-start p-0 h-16">
              {
                [...product.images, ...product.properties.filter((p)=>p.secure_url)].map((pro, idx) => (
                  <TabsTrigger key={idx} value={pro+idx.toString()}
                    className="w-16 h-full p-1 rounded-lg data-[state=active]:bg-primary/50"
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
            </Tabs>

          </div>

          {/* product details */}
          <div className='col-span-5 flex flex-col gap-4 h-full overflow-auto p-2'>
            <div className='w-full bg-primary px-4 rounded-lg'>
              <h2 className='text-xl font-bold text-white'>{product.name}</h2>
            </div>

            <div className='flex flex-col gap-2'>
              <p className='text-primary font-bold text-2xl'>{(+product.price)/100} $</p>
              <p className='text-xs text-black/70'>Price includes VAT</p>
            </div>

            <p className='font-bold px-2'>{product.description}</p>
            <hr className='border border-primary/70 my-2' />

            {/* product colors and size */}
            <div className='flex flex-col gap-2'>
              <PreviewTabs
                tabList={
                  product.properties.filter((property) => property.color?.length! > 0 && property)
                  .map((property) => (
                    <CartActions
                      key={property.color}
                      product={product}
                      productOptions={{ color:property.color! }}
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
              />

              <PreviewTabs
                tabList={
                  product.properties.filter((property) => property.name == "size" && property)
                  .map((property) => property.value!)[0]?.split(",")
                  .map((size) => (
                    <CartActions
                      key={size} className='w-full h-full py-4'
                      product={product}
                      productOptions={{ size }}
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
                <Button size="sm" variant="destructive" className='rounded-full'>-</Button>
              </CartActions>
              <CartInput id={product.id} />
              <CartActions increment product={product}>
                <Button size="sm" variant="primary" className='rounded-full'>+</Button>
              </CartActions>
            </div>

            {/* checkout action */}
            <div className='my-2'>
              {user ? (
                <Button size="sm" variant="primary" className='rounded-full py-7 text-lg'>
                  <Link href={"/checkout"}>Checkout now</Link>
                </Button>
              ):(
                <DialogPopup
                  dialogTrigger={<Button size="sm" variant="primary" className='rounded-full py-7 text-lg'>
                    Checkout now
                  </Button>}
                  dialogContent={<Signin />}
                  className='w-96 md:w-1/2 lg:w-1/3'
                />
              )}
            </div>
            
            {/* implement view details -> got product page */}
            {/* implement add to favorite list */}
            <div className='flex justify-between items-center gap-4'>
              <Button size="sm" variant="primary-outline" className='rounded-full py-5'>
                <Link href={`${product.categoryId}/${product.id}`}>View Details</Link>
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