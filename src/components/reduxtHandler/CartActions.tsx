'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart, selectProductOptions } from '@/store/cartSlice'
import { Product } from '@prisma/client'
import { Input } from '../ui/input'
import { RootState } from '@/store'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement>{
  favorite?: boolean
  increment?: boolean
  decrement?: boolean
  add?: boolean
  remove?: boolean
  product: Partial<Product>
  productSize?: string
  productColor?: string
}

function CartActions({ increment, add, remove, product, productSize, productColor, children, className }: Props) {

  const dispatch = useDispatch()
  const productCart = useSelector((state: RootState) => state.cart.items)
  const options = productCart.filter((c) => c.id === product.id)[0]
  const defaultSize = options?.properties?.filter((p) => p.name == "size")[0].value?.split(",")[0]
  const defaultColor = options?.properties?.filter((p) => p.color)[0].color

  const action = (_product: Partial<Product>) => productSize
  ? selectProductOptions({
    ..._product,
    size: productSize || defaultSize || null
    })
    : productColor
      ? selectProductOptions({
        ..._product,
        color: productColor || defaultColor
      })
      : increment
      ? incrementQuantity({
        ..._product,
        color: productColor || defaultColor,
        size: productSize || defaultSize || null
      })
      : add
        ? addToCart({
          ..._product,
          color: productColor || defaultColor,
          size: productSize || defaultSize || null
        })
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

export const CartInput = ({ product, className }: { product: Partial<Product>, className?: string}) => {

  const dispatch = useDispatch()
  const carts = useSelector((state: RootState) => state.cart.items)

  return (
    <Input
      type='number' className={cn(' px-2 rounded-sm w-12', className)} value={carts.filter((c) => c.id === product.id)[0]?.qty || 0}
      onChange={(e) => dispatch(incrementQuantity({ ...product, value: +e.target.value }))}
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