import React, {  } from 'react'
import DialogPopup from '../DialogPopup'
import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogClose } from "../ui/dialog";
import { ICellRendererParams } from 'ag-grid-community';
import { revalidatePathByAction } from '@/helpers/actions/revalidate';
import toast from 'react-hot-toast';
import useLoading from '@/hooks/useLoading';

interface Props {
  children?: React.ReactNode
  p: ICellRendererParams
  route: string
}

const DeleteButton = ({ p, route }: Props) => {
  let [isPending, startTransition] = useLoading();

  const deleteAction = async (data: any, action: string) => {
    startTransition(async() => {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard/${action}`, {
        method: "DELETE",
        body: JSON.stringify([data.id])
      })
      console.log("delete item -> res", res)
      if(res.ok) {
        revalidatePathByAction(action)
        toast.success(`${data.name} ${action} deleted successfully`)
        return
      }
      toast.error(`${data.name} ${action} deleted failed`)
    })      
  }

  return (
    <DialogPopup
      dialogTrigger={<Trash2 size={25} className="text-destructive ml-4 my-1" />}
      dialogTitle={<p className="text-destructive">Confirm Delete {route} Warning</p>}
      className='w-96 md:w-1/2 lg:w-1/3'
      dialogContent={
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold">
            Confirm deleting the (<strong className="text-primary-dark">{p.data.name}</strong>
            ) {route === 'categories' ? 'all relay categories and products will be deleting too' : 'product'}
          </p>
          <div className="flex gap-8 items-center mt-8">
            <form
              action={() => deleteAction(p.data, route)}
              className='w-full'
            >
              <Button variant="destructive" type='submit' isLoading={isPending}>Delete</Button>
            </form>
            <Button variant="outline">
              <DialogClose>Cancel</DialogClose>
            </Button>
          </div>
        </div>
      }
    />
  )
}

export default DeleteButton