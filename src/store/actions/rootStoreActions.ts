"use client"

import { useSelector } from "react-redux"
import { RootState } from ".."

export const handleSearchVisible = () => {
  const root = useSelector((store: RootState) => store.root.searchModal)
  console.log("root", root)
  // return { searchModal: { ...root, visible: true } }
}
