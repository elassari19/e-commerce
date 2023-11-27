'use client'

import { useDispatch, useSelector } from "react-redux"
import { rootHandler } from "@/store/rootSlice";
import { RootState } from "@/store";

export const handleMune = () => {
  const dispatch = useDispatch()
  const { openMenu } = useSelector((state: RootState) => state.root);
  // dispatch(rootHandler({ openMenu: !openMenu }))
  return console.log('open')
}