import React from 'react';
import Link from 'next/link';
import SuccessfullOrders from '@/components/cards/SuccessfullOrders';

const SuccessfulPaymentPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SuccessfullOrders />
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your order has been processed
          successfully.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/orders"
            className="hover:bg-gray-100 border font-bold py-2 px-4 rounded"
          >
            View Orders
          </Link>
          <Link
            href="/"
            className="bg-primary hover:bg-green-200 text-green-800 font-bold py-2 px-4 rounded"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulPaymentPage;
