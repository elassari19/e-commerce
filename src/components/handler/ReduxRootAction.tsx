"use client"

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { rootModalsType } from "@/types/rootTypes"
import { RootState } from "@/store"
import { reduxActionType } from "../../types/reduxActionType"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  actionType: reduxActionType,
  stateName: rootModalsType,
  payload: any,
}

const ReduxRootAction = ({ children, actionType, payload, stateName, ...rest }: Props) => {
  const dispatch = useDispatch()
  // @ts-ignore
  const state = useSelector((store: RootState) => store[stateName])

  return <div onClick={() => dispatch({ type: actionType, payload: { [stateName]: { ...state, ...payload }} })} {...rest}>
    {children}
  </div>
}

export default ReduxRootAction