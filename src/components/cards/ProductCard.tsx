import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ImageUrl, Product } from '@prisma/client'
import Image from 'next/image'
import { Plus, ShoppingCart } from 'lucide-react'
import CartActions from '../reduxtHandler/CartActions'

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

        <div className='flex justify-center'>
          <Image
            src={product.images[0]?.secure_url} alt={product.name} width={150} height={150}
            className='w-48 h-48 m4 rounded-full hover:scale-110 transform transition-transform duration-300 ease-in-out'
          />
        </div>
        <div className='flex flex-col gap-1 py-2'>
          <span className='text-xs font-bold whitespace-nowrap text-ellipsis'>{product.name}</span>
          <div className='relative flex justify-between items-center'>
            <span className='font-bold text-xl'>$ {product.price}</span>
            <CartActions add product={product} className='cursor-pointer'>
              <ShoppingCart size={40} className='w-12 h-12 text-primary rounded-full p-1 bg-primary/10' />
            </CartActions>
            <span className='absolute right-1 top-2 w-6 z-10 bg-[#e6f0e4]'>
              <Plus size={16} strokeWidth={4} className='text-primary' />
            </span>
          </div>
        </div>
    </div>
  )
}

export default ProductCard