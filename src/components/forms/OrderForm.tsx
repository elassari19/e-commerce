'use client';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { orderSchema } from '@/schema/productSchema';
import FormActions from './FormActions';
import FormikField from '../inputs/FormikField';
import SelectInput from '../SelectInput';
import OrderProductsList from '../OrderProductsList';
import toast from 'react-hot-toast';
import { revalidatePathByAction } from '../../helpers/actions/revalidate';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const OrderForm = ({}: Props) => {
  const [value, setValues] = React.useState<any>({
    isPaid: false,
    isDelivered: false,
    products: [],
  });

  const onSubmit = async (values: any) => {
    values.products = value.products.map((product: any) => ({
      productId: product.id,
      qty: +product.quantity,
      price: +product.price,
    }));
    values.isPaid = value.isPaid;
    values.isDelivered = value.isDelivered;

    console.log('values', values);
    const res = await fetch('/api/dashboard/orders/order', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    if (res.ok) {
      toast.success('New Order Was Created Successfully');
      revalidatePathByAction('orders');
    } else {
      toast.error('Failed to Create New Order');
      console.log('error', res);
    }
  };

  const initialValues = {
    quantity: 0,
    price: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    paymentMethod: '',
    isPaid: false,
    isDelivered: false,
    products: [],
  };

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={orderSchema}
      initialValues={initialValues}
    >
      {(formik) => (
        <Form className="text-black col-span-12 grid gap-4 p-4 w-full mb-36 md:mb-20 relative">
          {[
            {
              lable: 'Order Products',
              name: 'products',
            },
            // {
            //   lable: 'Order Quantity',
            //   name: 'quantity',
            //   value: formik.values.quantity,
            // },
            // { lable: 'Order Price', name: 'price', value: formik.values.price },
            // { lable: 'Order Tax', name: 'tax', value: formik.values.tax },
            // {
            //   lable: 'Order Shipping',
            //   name: 'shipping',
            //   value: formik.values.shipping,
            // },
            // { lable: 'Order Total', name: 'total', value: formik.values.total },
            {
              lable: 'Order Payment Method',
              name: 'paymentMethod',
              value: formik.values.paymentMethod,
            },
            {
              lable: 'Order Paid',
              name: 'paid',
              type: 'checkbox',
              onChange: (e: any) =>
                setValues((ord: any) => ({ ...ord, isPaid: e.target.checked })),
              checked: value.isPaid,
            },
            {
              lable: 'Order Delivered',
              name: 'delivered',
              type: 'checkbox',
              onChange: (e: any) =>
                setValues((ord: any) => ({
                  ...ord,
                  isDelivered: e.target.checked,
                })),
              checked: value.isDelivered,
            },
          ].map(({ name, lable, ...rest }, index) => (
            <div key={index}>
              {name === 'paymentMethod' ? (
                <SelectInput
                  placeholder="Select Payment Method"
                  data={[
                    { name: 'Card', slug: 'Card' },
                    { name: 'Cash', slug: 'Cash' },
                    { name: 'Credit', slug: 'Credit' },
                  ]}
                  onSelect={(e) => formik.setFieldValue('paymentMethod', e)}
                  value={formik.values.paymentMethod}
                />
              ) : name === 'products' ? (
                <OrderProductsList
                  onSelect={setValues}
                  values={value.Products}
                />
              ) : (
                <FormikField name={name} placeholder={lable} {...rest} />
              )}
            </div>
          ))}
          <div className="py-8 p-8 fixed bottom-0 right-0 left-0 bg-foreground shadow-md shadow-primary">
            <FormActions isSubmitting={formik.isSubmitting} update={false} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default memo(OrderForm);
