import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ImageUrl, Product } from '@prisma/client'
import Image from 'next/image'
import ProductPreview from '../modals/ProductPreview'
import { Button } from '../ui/button'
import Ratings from '../atoms/Ratings'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  product: Product & { images: ImageUrl[] },
  list?: boolean
  index?: number
}

const ProductCard = ({ className, product, list, index }: Props) => {

  return (
    <div
      className={cn(
        "col-span-1 w-full h-full shadow-lg rounded-md group p-4 overflow-hidden hover:shadow-primary/40 transist duration-300 ease-in-out",
        list && "flex justify-between items-center",className
      )}
    >
        <div className={cn('flex gap-2 bg-green-100 rounded-full w-fit px-2', list && "hidden")}>
          <span className='font-bold text-xs text-primary'>Stock</span>
          <span className='font-bold text-xs text-destructive'>{product.quantity}</span>
        </div>

        <Link href={`/products/${product.categoryId}/${product.id}`}
          className={cn('flex justify-center', list&&"w-1/4")}>
          <Image
            src={product.images[0]?.secure_url} priority={index==0} alt={product.name} width={150} height={150}
            className='w-48 h-48 m4 rounded-full hover:scale-110 transform transition-transform duration-300 ease-in-out'
          />
        </Link>

        <div className={cn('flex flex-col gap-1 py-2', list&&"w-1/3 self-start")}>
          <div>
            <p className={cn('text-xs font-bold whitespace-nowrap text-ellipsis',list&&"text-xl")}>{product.name}</p>
            <p
              className='text-xs font-bold whitespace-nowrap text-black/60 w-[90%] overflow-hidden overflow-ellipsis'
            >
              {product.description}
            </p>
          </div>
          <Ratings ratings={4} />
          <div className={cn('relative flex justify-between items-center')}>
            <span className='font-bold text-xl flex-1'>$ {+product.price/100}</span>
            <ProductPreview productId={product.id} className={cn('',list&&"hidden")} />
          </div>
        </div>

        <div className={cn("w-1/4 flex flex-col gap-2",!list&&"hidden")}>
          <ProductPreview
            productId={product.id}
            dialogTrigger={<Button variant="primary" className='rounded-full'>Add to cart</Button>}
          />
          <Button href={`${product.categoryId}/${product.id}`} variant="primary-outline" className='rounded-full'>
            Product Details
          </Button>
        </div>
    </div>
  )
}

export default ProductCard