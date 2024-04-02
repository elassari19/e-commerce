'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart, selectProductOptions } from '@/store/cartSlice'
import { Product } from '@prisma/client'
import { Input } from '../ui/input'
import { RootState } from '@/store'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import { toggleFavorite } from '../../store/favoriteSlice'

interface Props extends React.HTMLAttributes<HTMLDivElement>{
  favorite?: boolean
  increment?: boolean
  decrement?: boolean
  add?: boolean
  remove?: boolean
  product: Partial<Product>
  productOptions?: {
    color?: string
    size?: string
  }
}

function CartActions({ increment, add, remove, favorite, product, productOptions, children, className }: Props) {

  const dispatch = useDispatch()
  const productCart = useSelector((state: RootState) => state.cart.items)
  const options = productCart.filter((c) => c.id === product.id)[0]

  const action = (_product: Partial<Product>) => productOptions
  ? selectProductOptions({
    id: _product.id,
    color: productOptions.color || options?.color,
    size: productOptions.size || options?.size
  })
  : increment
    ? incrementQuantity(_product)
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
      type='number' className=' px-2 rounded-sm w-12' value={carts.filter((c) => c.id === id)[0]?.qty || 0}
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