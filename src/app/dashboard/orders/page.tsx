import React from 'react';
import Typography from '@/components/layout/typography';
import OrdersTable from '@/components/tabls/OrdersTable';
import MainCard from '@/components/cards/MainCard';
import { Upload, Download, Plus } from 'lucide-react';
import DeleteButtons from '@/components/buttons/DeleteButtons';
import DialogForm from '@/components/modals/DialogForm';
import { Button } from '@/components/ui/button';
import { getAllOrders } from '@/helpers/actions/orders';
import OrderForm from '@/components/forms/OrderForm';

const page = async ({}) => {
  const orders = await getAllOrders();

  return (
    <div>
      {/* event section */}
      <section>
        <MainCard className="grid grid-cols-12 gap-4 justify-between">
          <div className="md:col-span-6 grid grid-cols-12 col-span-12 md:grid-cols-10 gap-1">
            <div className="col-span-6 md:col-span-2">
              {/* export products to file (excel) */}
              <Button variant="outline">
                <Upload size={16} /> Export
              </Button>
            </div>
            <div className="col-span-6 md:col-span-2">
              {/* upload products based on sheet (excel) */}
              <Button variant="outline">
                <Download size={16} /> Import
              </Button>
            </div>
          </div>
          <div className="md:col-span-6 grid grid-cols-12 col-span-12 gap-2">
            {/* delete selected products */}
            <DeleteButtons action="orders" />
            {/* add product button & open dialog (modal/sheet) when click */}
            <div className="col-span-12 md:col-span-4 lg:col-span-4">
              <DialogForm
                sheetTitle="Add Category"
                sheetDescription="Add your Category and necessary information from here"
                sheetTrigger={
                  <Button variant="primary">
                    <Plus size={16} /> Add Order
                  </Button>
                }
                sheetContent={<OrderForm />}
                className="w-full md:w-3/4"
              />
            </div>
          </div>
        </MainCard>
      </section>

      <section className="grid gap-4">
        <Typography heading="h2" className="font-semibold text-lg p-4">
          Recent Order
        </Typography>
        <OrdersTable data={orders} />
      </section>
    </div>
  );
};

export default page;
