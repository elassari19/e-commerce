"use client"

import { useMemo } from "react"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  dependencies: any[]
}

const UseMemo = ({ children, dependencies }: Props) => {
  return useMemo(() => children, dependencies)
}

export default UseMemo