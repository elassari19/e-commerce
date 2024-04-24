import React from 'react'
import { db } from '@/lib/db'
import { PreviewTabs, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageUrl, Product, Properties, Reviews } from '@prisma/client'
import ImageMagnify from '@/components/cards/ImageMagnify'
import Image from 'next/image'
import Ratings from '@/components/atoms/Ratings'
import { ratings } from '@/helpers/methods/functions'
import CartActions, { CartInput } from '@/components/reduxtHandler/CartActions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DialogPopup from '@/components/DialogPopup'
import FavoriteAction from '@/components/reduxtHandler/FavoriteAction'
import { auth } from '@/lib/getAuthSession'
import { StarIcon } from 'lucide-react'
import Signin from '@/components/forms/Signin'

interface Props {
  params: {
    productId?: string
  }
}
const page = async ({ params }: Props) => {
  const user = await auth("email")

  const product = await db.product.findFirst({
    where: {
      id: params.productId
    },
      include: {
      images: true,
      properties: true,
      reviews: true,
    }
  }) as Product & { properties: (Properties&{images: ImageUrl[]})[], images: ImageUrl[], reviews: Reviews[] }

  return (
    <div className='grid grid-cols-12 gap-4 m-8 mb-24'>
      {/* product overview images */}
      <div className='col-span-12 md:col-span-4'>
        <Tabs defaultValue={"0"} className="w-full h-full">
          <div>
          {
            [...product.images, ...product.properties.filter((p)=>p.secure_url)].map((pro, idx) => (
              <TabsContent key={idx} tabIndex={idx} value={idx.toString()} className="mb-4 w-full h-full" >
                <ImageMagnify src={pro.secure_url!} />
              </TabsContent>
            ))
          }
          </div>
          <TabsList className="w-full overflow-auto justify-start p-0 h-16">
            {
              [...product.images, ...product.properties.filter((p)=>p.secure_url)].map((pro, idx) => (
                <TabsTrigger key={idx} value={idx.toString()}
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
      <div className='col-span-12 md:col-span-5 flex flex-col gap-4 h-full overflow-auto p-2'>
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
      <div className='col-span-12 md:col-span-3 font-bold'>
        <div className='min-w-[24%] fixed top-24 rigth-8 border flex flex-col gap-2 p-4 rounded-lg'>
          <div className=''>
            <p className='text-primary font-bold text-3xl'>{(+product.price)/100} $</p>
            <p className='text-xs text-black/60 mt-2'>Price includes VAT丨Extra 5% off with coins</p>
            <hr className='border border-primary/30 my-4' />
          </div>

          <div className='w-full overflow-auto'>
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
            <hr className='border border-primary/30 my-4' />
          </div>

          <div>
            <h2>Delivery</h2>
            <h3>Free shipping </h3>
            <p><span className='text-primary'>8-day delivery</span> by Apr 12</p>
            <hr className='border border-primary/70 my-2' />
            <h2>Service</h2>
            <p className='text-primary'>Free returns · Delivery Guarantee</p>
            <hr className='border border-primary/70 my-2' />
          </div>

          {/* select quantity */}
          <div className='flex flex-col gap-2'>
            <h2>Quantity</h2>
            <div className='flex gap-4 p-2 h-12'>
              {/* merge redux action with server component */}
              <CartActions decrement product={product}>
                <Button size="sm" variant="primary-outline" className='rounded-full px-3'>-</Button>
              </CartActions>
              <CartInput id={product.id} className='w-20' />
              <CartActions increment product={product}>
                <Button size="sm" variant="primary-outline" className='rounded-full px-3'>+</Button>
              </CartActions>
            </div>
            <p className='font-normal text-sm px-4'>{product.quantity} Pieces available</p>
          </div>

          {/* checkout action */}
          <div className='my-2 w-full'>
            {user ? (
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
            Add to Favorite <FavoriteAction productId={product.id} />
          </div>
        </div>
      </div>

      <section className="col-span-12 md:col-span-9">
        {/* Customer Reviews */}
        <h2 className='font-bold text-xl'>Customer Reviews ({product.reviews.length})</h2>
        <div className='py-8 grid grid-cols-12'>
          <div className='col-span-12 md:col-span-6 flex flex-col gap-2'>
            <Ratings ratings={ratings(product.reviews)} size={20} />
            <p>All from verified purchases</p>
          </div>

          <div className='col-span-12 md:col-span-6 flex flex-col justify-center gap-2'>
            {
              Array(5).fill("").map((_, idx) => (
                <div className='flex gap-2' key={idx}>
                  <span>{5-idx} stars</span>
                  <div className='flex-1 rounded-full bg-gray-200 h-2 my-2'>
                    <div className={`w-[${100-(idx*20)}%] p-1 bg-black rounded-full`}/>
                  </div>
                  <span>{19}</span>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      <section className='flex flex-col gap-6 col-span-12 md:col-span-9'>
        {
          Array(4).fill("").map((_, idx) => (
            <div key={idx} className='flex flex-col gap-2'>
              <div className='flex gap-1'>
                {Array(5).fill("").map((_, index) => <StarIcon size={20} fill='black' key={index} />)}
              </div>
              <p className='text-black/60'>Color&#58; Black&#44; Shoe Size&#58;46</p>
              <p>I received the reference during. I did not expect that, these shoes will be so good. They&apos;re just fabulous. Very comfortable and lightweight. They can be worn every day and the legs will rest without stress. And surprisingly low price for such a good shoe. And just great customer service. Thank you for such fabulously comfortable shoes!!!</p>
            </div>
          ))
        }
      </section>
    </div>
  )
}

export default page