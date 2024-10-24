// 'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShoppingBasket } from 'lucide-react';
import CartActions from '@/components/reduxtHandler/CartActions';
import DialogPopup from '@/components/DialogPopup';
import { DialogClose } from '@/components/ui/dialog';
import ChekoutList from '@/components/cards/ChekoutList';
import ChekoutInvoice from '@/components/cards/ChekoutInvoice';
import { auth } from '../../../../lib/getAuthSession';

const page = async () => {
  return (
    <div className="grid grid-cols-12 bg-black/5 min-h-screen">
      <div className="col-span-12 lg:col-span-10 lg:col-start-2 grid grid-cols-8 gap-2 my-4">
        <div className="col-span-12 md:col-span-5 flex flex-col gap-2">
          <section className="p-4 rounded bg-white flex justify-between items-center">
            <h2 className="text-xl font-bold flex-1">Shopping Cart</h2>
            <DialogPopup
              dialogTrigger={
                <div className="">
                  <Button
                    size="sm"
                    variant="outline-destructive"
                    className="font-semibold text-sm w-auto px-4 border-none"
                  >
                    <ShoppingBasket
                      size={16}
                      className="mr-1 text-destructive"
                    />
                    Clear Carte
                  </Button>
                </div>
              }
              dialogTitle="Confirm Clear Carte"
              dialogDescription={
                <div className="flex gap-8 items-center p-4 px-8">
                  <DialogClose>
                    <CartActions
                      removeAll
                      // @ts-ignore
                      product={[]}
                      className="w-auto bg-transparent text-destructive cursor-pointer border border-destructive p-2 px-4 rounded hover:bg-destructive hover:text-white"
                    >
                      Delete selected items
                    </CartActions>
                  </DialogClose>
                  <DialogClose>
                    <Button variant="destructive" className="px-4 w-auto h-10">
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              }
              className="w-auto"
            />
          </section>

          <section className="rounded bg-white overflow-hidden">
            <ChekoutList />
          </section>
        </div>

        <aside className="col-span-12 md:col-span-3 flex flex-col gap-2">
          <section className="p-4 rounded bg-white font-semibold">
            <ChekoutInvoice />
          </section>

          <section className="p-4 rounded bg-white font-semibold">
            <h3 className="text-xl">Pay with</h3>
            <div className="flex flex-wrap gap-2 items-center mt-4 mb-6">
              {[
                'https://res.cloudinary.com/elassari/image/upload/v1714586784/my-ecom-app/assets/k0h0dwxayekvpmeurfh3.webp',
                'https://res.cloudinary.com/elassari/image/upload/v1714586784/my-ecom-app/assets/celbn54m67unmf4u1lvs.webp',
                'https://res.cloudinary.com/elassari/image/upload/v1714586784/my-ecom-app/assets/gatgwyubmm7x34govpmd.webp',
                'https://res.cloudinary.com/elassari/image/upload/v1714586784/my-ecom-app/assets/my6z2fvfoidedkkkay09.webp',
                'https://res.cloudinary.com/elassari/image/upload/v1714586783/my-ecom-app/assets/a2dujufsvaumuhtbiwo3.webp',
                'https://res.cloudinary.com/elassari/image/upload/v1714586783/my-ecom-app/assets/elkqaycvaynhapfqngp4.webp',
              ].map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt="imag src"
                  className="h-8"
                  width={idx == 4 ? 100 : 50}
                  height={50}
                  loading="eager"
                />
              ))}
            </div>
            <h3 className="text-xl">Buyer protection</h3>
            <div className="flex gap-2 my-4">
              <Image
                src="https://res.cloudinary.com/elassari/image/upload/v1714586784/my-ecom-app/assets/goiidyjuuvtaahavbkdc.webp"
                alt="secure payment"
                width={100}
                height={50}
                className="w-6 h-6"
                loading="eager"
              />
              <p>
                {' '}
                Get full refund if the item is not as described or if is not
                delivered
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default page;
