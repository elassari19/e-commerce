"use client"

import { useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { dashboardHandler } from "@/store/dashboard/dashboard"
import { Action } from "@/store/actions/dashboardStoreActions"
import toast from "react-hot-toast"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  action: Action
  deleteItems: (deletData: any[], action: string) => Promise<any>
}

const DeleteButtons = ({ className, action, deleteItems }: Props) => {
  // @ts-ignore
  const deletData = useSelector((state: RootState) => state.dashboard[action])
  const dispatch = useDispatch()

  const handleDelete = useCallback(async () => {
    const res = await deleteItems(deletData.remove, action)

    if(res < 300){
      toast.success(`delete ${action} was Succeeded`)
      dispatch(dashboardHandler({
        [action]: { ...deletData, remove: [] }
      }))

    } else {
      toast.error(`delete ${action} was Failed`)
      console.log(res)
    }
  }, [deletData])

  return (
    <div
      className={cn('col-span-12 md:col-span-3 md:col-start-6', className)}
    >
      <Button
        variant="destructive" disabled={deletData?.remove?.length <= 0}
        onClick={handleDelete}
      >
        <Trash2 size={16} /> Delete
      </Button>
    </div>
  )
}

export default DeleteButtons