"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { dashboardHandler, deleteProductHandler } from "@/store/dashboard"
import { Action } from "@/store/actions/dashboardStoreActions"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  action: Action
}

const DeleteButtons = ({ className, action }: Props) => {
  const dashboard = useSelector((state: RootState) => state.dashboard[action])
  const dispatch = useDispatch()
  const handleDelete = () => {
    console.log(`delete all selected ${action}`)
    return dispatch(dashboardHandler({
      [action]: { ...dashboard, remove: [] }
    }))
  }

  return (
    <div
      className={cn('col-span-12 md:col-span-3 md:col-start-6', className)}
    >
      <Button
        variant="destructive" disabled={dashboard?.remove?.length <= 0}
        onClick={handleDelete}
      >
        <Trash2 size={16} /> Delete
      </Button>
    </div>
  )
}

export default DeleteButtons