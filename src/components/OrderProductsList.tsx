'use client';

import React, { useEffect } from 'react';
import { getSearchProducts } from '@/helpers/actions/Products';

import Image from 'next/image';
import { Command, CommandEmpty, CommandInput, CommandList } from './ui/command';
import { Button } from './ui/button';
import Typography from './layout/typography';
import { Input } from './ui/input';

interface IProps {
  onSelect: (event: any) => void;
  values: any[];
}

const OrderProductsList = ({ onSelect, values }: IProps) => {
  const [list, setList] = React.useState<any[]>(values || []);
  const [products, setProducts] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState<string>('');

  const productsList = async () => await getSearchProducts(search);

  useEffect(() => {
    if (search.trim().length > 2)
      productsList().then((res) => setProducts(res));
  }, [search]);

  useEffect(() => {
    onSelect((p: any) => ({ ...p, products: list }));
  }, [list]);

  const selectProduct = (product: any) => {
    const findProduct = list?.find((item) => item.id === product.id);
    if (findProduct) return;
    setList((p) => [...p, product]);
    setSearch('');
    return;
  };

  const unselectProduct = (product: any) => {
    const newSelectedValues = list.filter((item) => item.id !== product.id);
    setList(newSelectedValues);
    return;
  };

  const handleQuantity = (product: any, e: any) => {
    const { value } = e.target;
    const products = list?.map((item) =>
      item.id === product.id ? { ...item, quantity: value } : item
    );
    setList(products);
  };

  return (
    <div className="w-full grid gap-3">
      <div className="grid gap-2 w-full text-black">
        <Typography>Selected Order Products</Typography>
        {list?.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 px-4">
            <Image
              src={item?.images?.[0]?.secure_url}
              alt="product image"
              width={30}
              height={30}
            />
            <p>{item.name}</p>
            <Input
              value={item.quantity}
              onChange={(e) => handleQuantity(item, e)}
              name="quantity"
              placeholder="Quantity"
              className="w-14 flex-1"
            />
            <Button
              variant={'destructive'}
              className="text-lg w-6 h-6"
              onClick={() => unselectProduct(item)}
            >
              X
            </Button>
          </div>
        ))}
      </div>
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={(e) => setSearch(e)}
        />
        <CommandList className="overflow-auto">
          {products.length > 0 ? (
            <div className="w-full">
              {products.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full flex gap-2 items-center p-2 px-4 cursor-pointer"
                  onClick={() => selectProduct(item)}
                >
                  <Image
                    src={item.images[0].secure_url}
                    alt="product image"
                    width={30}
                    height={30}
                  />
                  {item.name}
                </div>
              ))}
            </div>
          ) : (
            search.trim().length > 2 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default OrderProductsList;
