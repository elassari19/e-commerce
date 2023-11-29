"use client"

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { SliceActionType, SliceStateName } from "@/types/sliceActionType"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  sliceActionType: SliceActionType,
  sliceStateName: SliceStateName,
  payload: any,
}

/**
 * ReduxDispatchAction - dispatch new actions
 * @sliceActionType is a action type (ex: root/rootHandler)
 * @sliceStateName is a name of item in state (ex: dashboardNav, country || country.code)
 * @returns ReactNode
 */
const ReduxDispatchAction = ({ children, sliceActionType, payload, sliceStateName, ...rest }: Props) => {
  const dispatch = useDispatch()
  // @ts-ignore
  const state = useSelector((store: RootState) => store[sliceStateName])

  return (
    <div
      onClick={
        () => dispatch({
          type: sliceActionType,
          payload: { ...state, [sliceStateName]: payload }
        })
      }
      {...rest}
    >
      {children}
    </div>
  )
}

export default ReduxDispatchAction
