import React from 'react';
import { DialogSheet } from '../ui/dialog';
import { ZoomInIcon } from 'lucide-react';
import { ImageUrl, Orders, Product, User } from '@prisma/client';
import Typography from '../layout/typography';
import Image from 'next/image';

interface IProps {
  order: Orders & {
    User: Partial<User>;
    Products: {
      id: string;
      quantity: number;
      product: Product & { images: ImageUrl };
    }[];
  };
}

const OrderDetails = ({ order }: IProps) => {
  console.log('order', order);
  return (
    <DialogSheet
      dialogTrigger={
        <div className="h-full flex items-center justify-start cursor-pointer">
          <ZoomInIcon size={24} />
        </div>
      }
      dialogTitle={<Typography variant={'h2'}>Order Details</Typography>}
      dialogDescription={
        <div className="flex gap-6 items-center border-b pb-4">
          <Typography variant="h5">
            Customer Name:{' '}
            <span className="font-semibold text-lg">
              {`${order.User.firstName} ${order.User.lastName}`}
            </span>
          </Typography>
          <Typography variant="h5">
            Order ID: <span className="font-semibold">{order.id}</span>
          </Typography>
          <Typography variant="h5">
            Order Date:{' '}
            <span className="font-semibold text-lg">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </Typography>
        </div>
      }
      dialogContent={<Details order={order} />}
    />
  );
};

export default OrderDetails;

const Details = ({ order }: IProps) => (
  <div className="grid grid-cols-3 gap-3 items-center">
    <Typography variant="h4" className="col-span-full">
      Order Amount:{' '}
      <span className="font-semibold">${(order.total / 100).toFixed(2)}</span>
    </Typography>
    <Typography variant="h5">
      Price:{' '}
      <span className="font-semibold text-lg">
        ${(order.price / 100).toFixed(2)}
      </span>
    </Typography>
    <Typography variant="h5">
      Tax:{' '}
      <span className="font-semibold text-lg">
        ${(order.tax / 100).toFixed(2)}
      </span>
    </Typography>
    <Typography variant="h5">
      Shipping:{' '}
      <span className="font-semibold text-lg">
        ${(order.shipping / 100).toFixed(2)}
      </span>
    </Typography>

    <Typography variant="h5">
      Payment Method:{' '}
      <span className="font-semibold text-lg">{order.paymentMethod}</span>
    </Typography>
    <Typography variant="h5">
      Paid:{' '}
      <span className="font-semibold text-lg">
        {order.isPaid ? 'Paid' : 'Not Paid'}
      </span>
    </Typography>
    <Typography variant="h5">
      Delivered:{' '}
      <span className="font-semibold text-lg">
        {order.isDelivered ? 'Delivered' : 'Not Delivered'}
      </span>
    </Typography>

    <div className="col-span-full gap-1 border-t pt-4">
      {order.Products.map((product, idx) => (
        <div
          key={idx}
          className="grid grid-cols-5 gap-2 items-center my-2 font-semibold text-lg"
        >
          <Image
            // @ts-ignore
            src={product.product.images?.[0].secure_url}
            width={40}
            height={40}
            alt="product image"
          />
          <Typography variant="h5">
            Price: ${(product.product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="h5" className="col-span-2">
            {product.product.name}
          </Typography>
          <Typography variant="h5">Quantity: {product.quantity}</Typography>
        </div>
      ))}
    </div>
  </div>
);
