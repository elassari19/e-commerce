'use client';

import { ChevronDown, SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';
import MotionSlide from '../framerMotion/MotionSlide';
import { useEffect, useState } from 'react';
import SearchProductsNav from '../nav/SearchProductsNav';
import { getSearchProducts } from '@/helpers/actions/Products';
import Dropdown from '../DropdownMenu';
import { Category } from '@prisma/client';
import Link from 'next/link';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  categories: Category[];
}

const Search = ({ placeholder, categories }: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = useDebouncedCallback(async (value: string) => {
    if (value && value.length > 2) {
      params.set('limit', '5');
      params.set('q', value);
      setProducts((await getSearchProducts(value)) as any);
    } else {
      params.delete('q');
      params.delete('limit');
    }
    replace(`${pathname}?${params}`);
  }, 500);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className="relative border md:max-w-[50%] flex-1 flex justify-between items-center rounded-xl bg-white text-black">
      <Input
        placeholder={placeholder || 'Search products'}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className="flex-1 pl-8 border-none"
        onFocus={(e) => setToggleSearch(true)}
        onBlur={(e) => setTimeout(() => setToggleSearch(false), 200)}
      />
      <>
        <Dropdown
          menuTrigger={
            <div className="p-2 flex items-center gap-1 md:hidden">
              <p className="font-demibold text-secondary">All</p>
              <ChevronDown className="text-primary cursor-pointer" />
            </div>
          }
          menuContent={categories.map((cate, idx) => (
            <li key={idx} className="text-sm list-none" title={cate.name}>
              <Link href={`/category/${cate.id}`}>{cate.name}</Link>
            </li>
          ))}
          className="h-76 overflow-auto mt-0"
        />
      </>
      <button type="submit" className="hidden md:block">
        <SearchIcon className="text-primary mx-2 cursor-pointer" />
      </button>
      {toggleSearch && (
        <MotionSlide
          top={10}
          className="absolute z-50 bg-white top-12 w-full max-h-56 overflow-y-auto shadow-md"
        >
          <SearchProductsNav products={products} searchQuery={searchQuery} />
        </MotionSlide>
      )}
    </div>
  );
};

export default Search;

/*
'use client';

import { ChevronDown, SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import SearchProductsNav from '../nav/SearchProductsNav';
import { getSearchProducts } from '@/helpers/actions/Products';
import Dropdown from '../DropdownMenu';
import { Category } from '@prisma/client';
import Link from 'next/link';
import { PopoverPopup } from '../ui/popover';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  categories: Category[];
}

const Search = ({ placeholder, categories }: Props) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = useDebouncedCallback(async (value: string) => {
    if (value && value.length > 2) {
      params.set('limit', '5');
      params.set('q', value);
      setProducts((await getSearchProducts(value)) as any);
    } else {
      params.delete('q');
      params.delete('limit');
    }
    replace(`${pathname}?${params}`);
  }, 500);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className="flex-1 flex">
      <PopoverPopup
        popoverTrigger={
          <div className="relative border flex-1 flex justify-between items-center rounded-xl overflow-hidden bg-white text-black">
            <Input
              placeholder={placeholder || 'Search products'}
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="flex-1 pl-8 border-none"
            />
            <>
              <Dropdown
                menuTrigger={
                  <div className="p-2 flex items-center gap-1 md:hidden">
                    <p className="font-demibold text-secondary">All</p>
                    <ChevronDown className="text-primary cursor-pointer" />
                  </div>
                }
                menuContent={categories.map((cate, idx) => (
                  <li key={idx} className="text-sm list-none" title={cate.name}>
                    <Link href={`/category/${cate.id}`}>{cate.name}</Link>
                  </li>
                ))}
                className="h-76 overflow-auto mt-0"
              />
            </>
            <button type="submit" className="hidden md:block">
              <SearchIcon className="text-primary mx-2 cursor-pointer" />
            </button>
          </div>
        }
        popoverContent={
          <SearchProductsNav products={products} searchQuery={searchQuery} />
        }
      />
    </div>
  );
};

export default Search;

*/
