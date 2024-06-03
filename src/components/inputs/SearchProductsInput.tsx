"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import MotionSlide from "../framerMotion/MotionSlide";
import { useEffect, useState, useTransition } from "react";
import SearchProductsNav from "../nav/SearchProductsNav";
import { getSearchProducts } from "@/helpers/actions/Products";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = ({ placeholder }: Props) => {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = useDebouncedCallback(async(value: string) => {

    if (value && value.length > 2) {
      params.set("limit", '5');
      params.set("q", value);
      setProducts(await getSearchProducts(value)as any); 
    } else {
      params.delete("q");
      params.delete("limit");
    }
    replace(`${pathname}?${params}`);
  }, 500);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery])  

  return (
    <div className="relative border max-w-[50%] flex-1 flex justify-between items-center rounded-xl overflow-hidden bg-white text-black">
      <Input
        placeholder={placeholder || "Search products"}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className="flex-1 pl-8 border-none"
        onFocus={(e) => setToggleSearch(true)}
        onBlur={(e) => setTimeout(() => setToggleSearch(false), 200)}
      />
      <button type="submit">
      <SearchIcon className="text-primary mx-2 cursor-pointer" />
      </button>
      {
        toggleSearch && (
          <MotionSlide top={10} className="absolute z-50 bg-white top-12 w-full max-h-56 overflow-y-auto shadow-md">
            <SearchProductsNav products={products} searchQuery={searchQuery} />
          </MotionSlide>
        )
      }
    </div>
  );
};

export default Search;