import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ImageUrl, Product } from '@prisma/client'
import Image from 'next/image'
import ProductPreview from '../modals/ProductPreview'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  product: Product & { images: ImageUrl[] }
}

const ProductCard = ({ className, product }: Props) => {

  return (
    <div
      className={cn(
        "col-span-1 w-full h-full shadow-lg rounded-md group p-4 overflow-hidden hover:shadow-primary/40 transist duration-300 ease-in-out",
        className
      )}
    >
        <div className='flex gap-2 bg-green-100 rounded-full w-fit px-2'>
          <span className='font-bold text-xs text-primary'>Stock</span>
          <span className='font-bold text-xs text-destructive'>{product.quantity}</span>
        </div>

        <Link href={`/products/${product.categoryId}/${product.id}`}
          className='flex justify-center'>
          <Image
            src={product.images[0]?.secure_url} alt={product.name} width={150} height={150}
            className='w-48 h-48 m4 rounded-full hover:scale-110 transform transition-transform duration-300 ease-in-out'
          />
        </Link>
        <div className='flex flex-col gap-1 py-2'>
          <span className='text-xs font-bold whitespace-nowrap text-ellipsis'>{product.name}</span>
          <div className='relative flex justify-between items-center'>
            <span className='font-bold text-xl flex-1'>$ {+product.price/100}</span>
            <ProductPreview productId={product.id} />
          </div>
        </div>
    </div>
  )
}

export default ProductCard