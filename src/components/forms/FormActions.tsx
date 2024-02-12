import React from 'react'
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { Button } from '../ui/button'

interface Props {
  isSubmitting: boolean
}

const FormActions = ({ isSubmitting }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-6">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="h-14"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >Add Product</Button>
      </div>
      <div className="col-span-12 md:col-span-6">
        <SheetPrimitive.Close className="w-full">
          <Button
            variant="outline-destructive"
            size="sm"
            className="h-14"
          >Cancel</Button>
        </SheetPrimitive.Close>
      </div>
    </div>

  )
}

export default FormActions