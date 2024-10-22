import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderCard from '@/components/cards/OrderCard';

type Props = {};

const page = ({}: Props) => {
  return (
    <div className="p-4 bg-black/5 grid grid-cols-12 relative">
      <Tabs defaultValue="payment" className="sticky top-28 z-40">
        <TabsList className="">
          <div className="flex flex-col items-start gap-2 bg-white rounded-lg p-4 pr-8">
            <h1 className="font-semibold px-2">Account</h1>
            <hr className="w-full bg-black/10 my-4" />
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="wishList">Wish List</TabsTrigger>
          </div>
        </TabsList>
      </Tabs>
      <Tabs
        defaultValue="View All"
        className="flex flex-col gap-2 col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3"
      >
        <TabsList className="bg-white p-8 py-4 w-full overflow-auto justify-start gap-0 [&_*]:border-none top-20 sticky z-50">
          <TabsTrigger
            className="data-[state=active]:bg-primary rounded-md"
            value="View All"
          >
            View All
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-primary rounded-md"
            value="To ship"
          >
            To ship ({orders.filter((order) => order.status == 'ship').length})
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-primary rounded-md"
            value="Shipped"
          >
            Shipped (
            {orders.filter((order) => order.status == 'shipped').length})
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-primary rounded-md"
            value="Processed"
          >
            Processed (
            {orders.filter((order) => order.status == 'completed').length})
          </TabsTrigger>
        </TabsList>

        <div className="w-full">
          <TabsContent value="View All" className="flex flex-col gap-2">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
          <TabsContent value="To ship">
            {orders
              .filter((order) => order.status == 'ship')
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </TabsContent>
          <TabsContent value="Shipped">
            {orders
              .filter((order) => order.status == 'shipped')
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </TabsContent>
          <TabsContent value="Processed">
            {orders
              .filter((order) => order.status == 'completed')
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default page;

const orders = [
  {
    id: '1',
    name: 'Product 1',
    price: 153465,
    quantity: 1,
    orderData: '2021-09-01',
    status: 'ship',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: '2',
    name: 'Product 2',
    price: 144550,
    quantity: 1,
    orderData: '2021-09-01',
    status: 'ship',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: '3',
    name: 'Product 3',
    price: 100,
    quantity: 1,
    orderData: '2021-09-01',
    status: 'completed',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: '4',
    name: 'Product 4',
    price: 100,
    quantity: 1,
    orderData: '2021-09-01',
    status: 'completed',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: '5',
    name: 'Product 5',
    price: 10509,
    quantity: 1,
    orderData: '2021-05-41',
    status: 'completed',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: '6',
    name: 'Product 6',
    price: 10490,
    quantity: 1,
    orderData: '2021-09-01',
    status: 'completed',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: '7',
    name: 'Product 7',
    price: 10089,
    quantity: 1,
    orderData: '2023-04-01',
    status: 'ship',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: '8',
    name: 'Product 8',
    price: 10056,
    quantity: 1,
    orderData: '2023-09-01',
    status: 'shipped',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: '9',
    name: 'Product 9',
    price: 10054,
    quantity: 1,
    orderData: '2021-09-01',
    status: 'shipped',
    images: ['https://via.placeholder.com/150'],
  },
  {
    id: '10',
    name: 'Product 10',
    price: 10045,
    quantity: 1,
    orderData: '2024-09-01',
    status: 'shipped',
    images: ['https://via.placeholder.com/150'],
  },
];
