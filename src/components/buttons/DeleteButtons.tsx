"use client"

import { useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { dashboardHandler } from "@/store/dashboard"
import { Action } from "@/store/actions/dashboardStoreActions"
import toast from "react-hot-toast"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  action: Action
}

const DeleteButtons = ({ className, action }: Props) => {
  // @ts-ignore
  const dashboard = useSelector((state: RootState) => state.dashboard[action])
  const dispatch = useDispatch()

  const handleDelete = useCallback(async () => {
    const deletData = await dashboard.remove.map((item: any) => item.id)
    const res = await fetch(`/api/dashboard/${action}`, {
      method: "DELETE",
      body: JSON.stringify(deletData)
    })

    if(res.ok){
      toast.success(`delete ${action} was Succeeded`)
      dispatch(dashboardHandler({
        [action]: { ...dashboard, remove: [] }
      }))

      window.location.reload()
    } else {
      toast.error(`delete ${action} was Failed`)
    }
  }, [dashboard])

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