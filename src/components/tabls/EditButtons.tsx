import React from 'react'
import DialogForm from '../modals/DialogForm'
import { Pen } from 'lucide-react'
import { ICellRendererParams } from 'ag-grid-community'
import { Category, Product } from '@prisma/client'

interface Props {
  Form: React.JSXElementConstructor<any>
  data: Product[] | Category[] 
  p: ICellRendererParams
}

const EditButtons = ({ Form, data, p }: Props) => {

  return (
    <DialogForm
      sheetTitle="Add Category"
      sheetDescription="Add your Category and necessary information from here"
      sheetTrigger={<Pen size={25} className="text-gray-500 ml-4 my-1 cursor-pointer" />}
      sheetContent={<Form categories={data} formUpdateData={p.data} />}
      className="w-full md:w-3/4"
    />
  )
}

export default EditButtons