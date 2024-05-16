'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Button } from '../ui/button'
import { HeartIcon } from 'lucide-react'
import { toggleFavorite } from '../../store/favoriteSlice'
import { cn } from '../../lib/utils'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  productId: string
}

const FavoriteAction = ({ productId, className }: Props) => {
  const dispatch = useDispatch()
  const favorite = useSelector((state: RootState) => state.favorite.items)
    .includes(productId)

    return (
    <Button
      size="sm" variant={favorite? "primary":"primary-outline"} className={cn('rounded-full p-5 flex-1', className)}
      onClick={() => dispatch(toggleFavorite(productId))}
    >
      <HeartIcon
        size={20}
        strokeWidth={2}
      /> 
    </Button>
  )
}

export default FavoriteAction