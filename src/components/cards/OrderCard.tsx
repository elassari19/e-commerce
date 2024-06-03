import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  order: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    orderData: string;
    status: string;
    images: string[];
  }
}

const OrderCard = ({ order }: Props) => {
  return (
    <div className='bg-white p-2'>
    <div className='flex items-center justify-between border-b p-4 py-2'>
      <h4 className='font-semibold'>{order.status}</h4>
      <div className='flex gap-2 items-center'>
        <div className='flex flex-col items-end text-xs font-ligth'>
          <p>Order date: {order.orderData}</p>
          <p>Order ID: {order.id}</p>
        </div>
        <p className='text-black/30'>|</p>
        <Link href="/details" className='font-semibold text-sm'>Order Details</Link>
      </div>
    </div>
    <div className='flex items-center justify-between p-2'>
      <div className='flex gap-2'>
      {
        order.images.map((img, idx) => (
          <Image
            key={idx} src={img} alt="product image"
            width={120} height={150}
            className='rounded-md'
          />
        ))
      }
      </div>
      <div className='flex flex-col justify-center items-end text-sm font-semibold'>
        <p>Total: {+order.price/100}</p>
      </div>
    </div>
  </div>

  )
}

export default OrderCard