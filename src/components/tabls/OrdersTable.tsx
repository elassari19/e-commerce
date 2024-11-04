'use client';

import Table from './Table';
import OrderDetails from '../modals/OrderDetails';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data?: any;
}

const OrdersTable = ({ data }: Props) => {
  const rowData = data?.map((item: any) => {
    return {
      'INVOICE NO': item.id,
      'ORDER TIME': item.updatedAt,
      'CUSTOMER NAME': `${item.User.firstName} ${item.User.lastName}`,
      METHOD: item.paymentMethod,
      AMOUNT: (item.total / 100).toFixed(2),
      PAID: item.isPaid ? 'Paid' : 'Not Paid',
      DELIVERED: item.isDelivered ? 'Delivered' : 'Not Delivered',
      INVOICE: item,
    };
  });

  // Column Definitions: Defines & controls grid columns.
  const colDefs = [
    { field: 'INVOICE NO', checkboxSelection: true },
    { field: 'ORDER TIME', width: 200 },
    { field: 'CUSTOMER NAME' },
    { field: 'METHOD' },
    {
      field: 'AMOUNT',
      cellRenderer: ({ value }: { value: number }) => <span>${value}</span>,
    },
    { field: 'PAID', editable: true },
    { field: 'DELIVERED', editable: true },
    {
      field: 'INVOICE',
      cellRenderer: (item: any) => {
        return <OrderDetails order={item.data.INVOICE} />;
      },
    },
  ];

  return <Table rowsData={rowData} colsDefs={colDefs} action="orders" />;
};

export default OrdersTable;
