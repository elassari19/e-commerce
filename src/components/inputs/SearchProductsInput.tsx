"use client";

import { Loader2, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import MotionSlide from "../framerMotion/MotionSlide";
import { Suspense, useState } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = ({ placeholder }: Props) => {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [toggleSearch, setToggleSearch] = useState(false);

  const handleSearch = useDebouncedCallback((e: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", '1');

    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }, 1000);

  return (
    <div className="relative flex-1 flex justify-between items-center rounded-sm bg-white text-black">
      <Input
        placeholder={placeholder}
        onChange={handleSearch}
        // value={searchParams.get("q") || ""}
        className="flex-1"
        onFocus={(e) => setToggleSearch(true)}
        onBlur={(e) => setToggleSearch(false)}
      />
      <button type="submit">
      <SearchIcon className="text-primary mx-2 cursor-pointer" />
      </button>
      {
        toggleSearch && (
          <MotionSlide bottom={10} className="absolute top-12 h-48 w-full overflow-auto shadow-md">
            <Suspense fallback={<div className="">
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            </div>}>
              {/* <Loader2 className='mx-auto h-40 w-40 animate-spin text-primary' /> */}
            </Suspense>
            
          </MotionSlide>
        )
      }
    </div>
  );
};

export default Search;