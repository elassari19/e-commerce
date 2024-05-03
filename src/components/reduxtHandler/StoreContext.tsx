import React, { Dispatch } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { AnyAction } from '@reduxjs/toolkit'

type Props = {
  children: (store: RootState, dispatch: Dispatch<AnyAction>) => React.ReactNode
}

const StoreContext = ({ children }: Props) => {
  const store = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  return (
    <>{children(store, dispatch)}</>
  )
}

export default StoreContext