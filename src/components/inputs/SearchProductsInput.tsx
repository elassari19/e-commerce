"use client";

import { Loader2, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import MotionSlide from "../framerMotion/MotionSlide";
import { Suspense, useEffect, useState } from "react";
import SearchProductsNav from "../nav/SearchProductsNav";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = ({ placeholder, children }: Props) => {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", '1');

    if (value) {
      value.length > 2 && params.set("q", value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }, 500);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery])
  

  return (
    <div className="relative flex-1 flex justify-between items-center rounded-sm bg-white text-black">
      <Input
        placeholder={placeholder || "Search products"}
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className="flex-1"
        onFocus={(e) => setToggleSearch(true)}
        onBlur={(e) => setToggleSearch(false)}
      />
      <button type="submit">
      <SearchIcon className="text-primary mx-2 cursor-pointer" />
      </button>
      {
        toggleSearch && <MotionSlide top={10} className="absolute top-12 w-full max-h-48 shadow-md">
          <Suspense fallback={
            <div className="h-48 flex justify-center items-center">
              <Loader2 className='h-16 w-16 animate-spin text-primary' />
            </div>
          
          }>
            {children}
          </Suspense>
        </MotionSlide>
      }
    </div>
  );
};

export default Search;