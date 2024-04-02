'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Button } from '../ui/button'
import { HeartIcon } from 'lucide-react'
import { toggleFavorite } from '../../store/favoriteSlice'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  productId: string
}

const FavoriteAction = ({ productId }: Props) => {
  const dispatch = useDispatch()
  const favorite = useSelector((state: RootState) => state.favorite.items)
    .includes(productId)

    return (
    <Button
      size="sm" variant={favorite? "primary":"primary-outline"} className='rounded-full p-5 flex-1'
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