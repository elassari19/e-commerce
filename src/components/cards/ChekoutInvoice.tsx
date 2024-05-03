'use client'
import React from 'react'
import StoreContext from '../reduxtHandler/StoreContext'
import { Button } from '../ui/button'
import { loadStripe } from '@stripe/stripe-js'
import { IProductData } from '../../types/products'
import toast from 'react-hot-toast'

type Props = {}

const ChekoutInvoice = (props: Props) => {

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  const handlePayment = async (cart: IProductData[]) => {
    const stripe = await stripePromise;
    const response = await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify(cart),
    })
    const data = await response.json()
    if(data.id){
      const result = await stripe?.redirectToCheckout({
        sessionId: data.id,
      });
    } else {
      toast.error('Payment failed')
    }
  }

  return (
    <StoreContext>
      {(store, dispatch) => 
      {
        const total = (store.cart.items.reduce((acc, item) => acc + (+item.price * item.qty), 0)/100).toFixed(2)

        return(
          <>
            <h2 className='text-xl'>Summary</h2>
            <div className='flex flex-col gap-2 my-4'>
              <div className='flex justify-between items-center'>
                <p className='text-sm'>Subtotal</p>
                <p>{total}$</p>
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-sm'>Shipping fee</p>
                <p>{(+total*0.25).toFixed(2)}$</p>
              </div>
      
              <div className='flex justify-between items-start'>
                <p className='text-sm'>Total</p>
                <div className='flex flex-col items-end'>
                  <p>{(+total + (+total*0.25)).toFixed(2)}$</p>
                  <p className='text-xs text-black/30'>Inclusive of VAT</p>
                </div>
              </div>
            </div>
            <Button
              variant="primary" className='rounded-full'
              href=''
              onClick={()=>handlePayment(store.cart.items)}
            >
              Pay Now ({store.cart.items.length})
            </Button>
          </>
      )}
      }
    </StoreContext>
  )
}

export default ChekoutInvoice