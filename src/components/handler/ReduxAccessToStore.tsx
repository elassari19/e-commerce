"use client"

import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { createElement } from "react"

interface Props {
  children: React.ReactNode | ((props: any) => React.ReactNode)
}

const ReduxAccessToStore = ({ children }: Props) => {
  console.log(children)
  return (props: any) => {
    const store = useSelector((state: RootState) => state)
    console.log(props)
    return createElement("div", { store: store, ...props}, props.children)
  }
}

export default ReduxAccessToStore