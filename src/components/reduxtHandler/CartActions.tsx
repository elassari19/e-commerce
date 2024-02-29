'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '@/store/cartSlice'
import { Product } from '@prisma/client'
import { Input } from '../ui/input'
import { RootState } from '@/store'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement>{
  increment?: boolean
  decrement?: boolean
  add?: boolean
  remove?: boolean
  product: Partial<Product>
}

function CartActions({ increment, add, remove, product, children, className }: Props) {

  const dispatch = useDispatch()

  const action = (_product: Partial<Product>) => increment
    ? incrementQuantity({ id: _product.id})
    : add
      ? addToCart(_product)
      : remove
        ? removeFromCart({ id: _product.id})
        : decrementQuantity({ id: _product.id})

  return (
    <div
      onClick={() => dispatch(action(product))}
      className={cn("", className)}
    >
      {children}
    </div>
  )
}

export default CartActions

export const CartInput = ({ id }: { id: string}) => {

  const dispatch = useDispatch()
  const carts = useSelector((state: RootState) => state.cart.items)

  return (
    <Input
      type='number' className=' px-2 rounded-sm w-12' value={carts[+id]?.qty}
      onChange={(e) => dispatch(incrementQuantity({ id: +id, value: +e.target.value }))}
    />
  )
}

export const CartBadge = ({ type }: { type: string }) => {

  const store = useSelector((state: RootState) => state)
  // @ts-ignore
  if (store?.[type]?.items.length > 0)
  return (
    <Badge variant="destructive" className='animate-bounce absolute -top-2 -right-2 p-1 h-4'>
      {/* @ts-ignore */}
      {store?.[type]?.items.length}
    </Badge>
  )
}