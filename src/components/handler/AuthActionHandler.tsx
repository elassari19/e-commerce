"use client"

import { useDispatch, useSelector } from "react-redux"
import { rootHandler } from "@/store/rootSlice"
import { rootModalsType } from "@/types/rootTypes"
import { RootState } from "@/store"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  stateName: rootModalsType,
  action: any
}

const RootAction = ({ children, action, stateName, ...rest }: Props) => {
  const dispatch = useDispatch()
  const state = useSelector((store: RootState) => store.root[stateName])

  return <div onClick={() => dispatch(rootHandler({ ...state, action}))} {...rest}>
    {children}
  </div>
}

export default RootAction