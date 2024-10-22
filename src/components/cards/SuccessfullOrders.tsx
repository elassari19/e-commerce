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

  const setOrders = async (items: IProductData[]) => {
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
    const data = await res.json();
    if (data.ok) {
      dispatch(removeAllFromCart());
      toast.success('Payment successfully');
    }
  };

  useEffect(() => {
    setOrders(carte.items);
  }, []);
  return <div></div>;
};

export default SuccessfullOrders;
