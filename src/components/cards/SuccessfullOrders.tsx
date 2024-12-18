'use client';

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { removeAllFromCart } from '@/store/cartSlice';
import { IProductData } from '@/types/products';
import toast from 'react-hot-toast';

const SuccessfullOrders = () => {
  const dispatch = useDispatch();
  const carte = useSelector((state: RootState) => state.cart);

  const saveOrders = async (items: IProductData[]) => {
    const Products = items.map((item) => ({
      ...item,
      productId: item.id,
      price: item.price,
    }));

    const res = await fetch('/api/dashboard/orders', {
      method: 'POST',
      body: JSON.stringify(Products),
    });
    console.log('success res', res);
    console.log('success data', res);
    if (res.ok) {
      dispatch(removeAllFromCart());
      return toast.success('Payment successfully');
    }
  };

  useEffect(() => {
    if (carte.items.length) saveOrders(carte.items);
  }, []);
  return <div></div>;
};

export default SuccessfullOrders;
