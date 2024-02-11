"use client"

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { productHandler } from "../../store/dashboard/product"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  attributeName: string,
  payload: any,
}

/**
 * DispatchProduct - dispatch new actions
 * @attributeName is a name of item in state (ex: creat product nav, product.images)
 * @returns ReactNode
 */

const DispatchProduct = ({ children, payload, attributeName, ...rest }: Props) => {

  const dispatch = useDispatch()
  const state = useSelector((store: RootState) => store.product)

  return (
    <div
      onClick={ () => dispatch(productHandler({ [attributeName]: payload })) }
      {...rest}
    >
      {children}
    </div>
  )
}

export default DispatchProduct
