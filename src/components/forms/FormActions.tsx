import React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { Button } from '../ui/button';

interface Props {
  isSubmitting: boolean;
  update: boolean;
}

const FormActions = ({ isSubmitting, update }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-3 md:col-start-7">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="h-14 w-full"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {update ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
      <div className="col-span-12 md:col-span-3">
        <SheetPrimitive.Close className="w-full">
          <Button variant="destructive" size="sm" className="h-14 w-full">
            Cancel
          </Button>
        </SheetPrimitive.Close>
      </div>
    </div>
  );
};

export default FormActions;
