import { Product } from '@prisma/client'
import React from 'react'
import CartActions, { CartInput } from './CartActions'
import { Button } from '../ui/button'

type Props = {
  product: Product
}

const ProductQuantity = ({ product }: Props) => {
  return (
    <div className='flex gap-2 p-2 h-12'>
    {/* merge redux action with server component */}
      <CartActions decrement product={product}>
        <Button size="sm" variant="secondary-outline" className='rounded-full bg-black/5'>-</Button>
      </CartActions>
      <CartInput product={product} className='border-none bg-transparent pl-4 text-center' />
      <CartActions increment product={product}>
        <Button size="sm" variant="secondary-outline" className='rounded-full bg-black/5'>+</Button>
      </CartActions>
    </div>
  )
}

export default ProductQuantity