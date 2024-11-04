'use server';

import { db } from '@/lib/db';

export const getAllOrders = async () => {
  const orders = await db.orders.findMany({
    include: {
      User: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      Products: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              sold: true,
              images: {
                select: {
                  secure_url: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return orders;
};

export const getOrderById = async (orderId: string) => {
  const order = await db.orders.findUnique({
    where: { id: orderId },
    include: {
      Products: true,
      User: true,
    },
  });
  return order;
};

export const createOrder = async (order: any) => {
  const newOrder = await db.orders.create({
    data: order,
  });
  return newOrder;
};

export const updateOrder = async (orderId: string, order: any) => {
  const updatedOrder = await db.orders.update({
    where: { id: orderId },
    data: order,
  });
  return updatedOrder;
};
