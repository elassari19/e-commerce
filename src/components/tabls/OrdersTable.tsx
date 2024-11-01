'use client';

import Link from 'next/link';
import { ZoomInIcon } from 'lucide-react';
import Table from './Table';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data?: any;
}

const OrdersTable = ({ className, data }: Props) => {
  const rowData = data?.map((item: any) => {
    return {
      'INVOICE NO': item.id,
      'ORDER TIME': item.updatedAt,
      'CUSTOMER NAME': `${item.User.firstName} ${item.User.lastName}`,
      METHOD: item.paymentMethod,
      AMOUNT: (item.total / 10).toFixed(2),
      STATUS: item.isPaid ? 'Paid' : 'Not Paid',
      DELEVERED: item.isDelivered ? 'Delivered' : 'Not Delivered',
      INVOICE: '',
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
      cellRenderer: ({ value }: { value: any }) => <span>${value}</span>,
    },
    { field: 'STATUS' },
    { field: 'ACTION', editable: true },
    {
      field: 'INVOICE',
      cellRenderer: () => (
        <Link
          href={'/order/10631'}
          className="h-full flex items-center justify-center"
        >
          <ZoomInIcon />
        </Link>
      ),
    },
  ];

  return <Table rowsData={rowData} colsDefs={colDefs} action="order" />;
};

export default OrdersTable;
