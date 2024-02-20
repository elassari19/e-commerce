'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '../../store/cartSlice'
import { Product } from '@prisma/client'
import { Input } from '../ui/input'
import { RootState } from '../../store'
import { Badge } from '../ui/badge'

interface Props extends React.HTMLAttributes<HTMLDivElement>{
  increment?: boolean
  decrement?: boolean
  add?: boolean
  remove?: boolean
  product: Partial<Product>
}

function CartActions({ increment, add, remove, product, children }: Props) {

  const dispatch = useDispatch()

  const action = (id: number) => increment
    ? incrementQuantity({ id})
    : add
      ? addToCart({ id})
      : remove
        ? removeFromCart({ id})
        : decrementQuantity({ id})

  return (
    <div
      onClick={() => dispatch(action(+product.id!))}
    >
      {children}
    </div>
  )
}

export default CartActions

export const CartInput = ({ product }: { product: Pick<Product, "id">}) => {

  const dispatch = useDispatch()
  const carts = useSelector((state: RootState) => state.cart.items)

  return (
    <Input
      type='number' className=' px-2 rounded-sm w-12' value={+carts[+product.id]?.quantity}
      onChange={(e) => dispatch(incrementQuantity({ id: +product.id, value: +e.target.value }))}
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