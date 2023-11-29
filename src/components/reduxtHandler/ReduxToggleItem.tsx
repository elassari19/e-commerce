"use client"

import { MenuIcon } from "lucide-react"
import ReduxDispatchAction from "./ReduxDispatchAction"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { SliceActionType, SliceStateName } from "../../types/sliceActionType"

interface Props  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  sliceActionType: SliceActionType,
  sliceStateName: SliceStateName,
  storeName: "dashboard" | "root" |"auth"
}

const ReduxToggleItem = ({ children, className, storeName, sliceStateName, sliceActionType }: Props) => {
  // @ts-ignore
  const nav = useSelector((state: RootState) => state[storeName][sliceStateName])
  return <div className={className}>
    <ReduxDispatchAction
      sliceActionType={sliceActionType}
      sliceStateName={sliceStateName}
      payload={nav === false ? true : false}
    >
      {children}
    </ReduxDispatchAction>
  </div>
}

export default ReduxToggleItem