"use client";

import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = ({ placeholder }: Props) => {

  const [toggleNav, setToggleNav] = React.useState(false);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

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
        onBlur={() => setToggleNav(false)}
        onFocus={() => setToggleNav(true)}
        className="flex-1"
      />
      <button type="submit">
      <SearchIcon className="text-primary mx-2 cursor-pointer" />
      </button>
      {
        toggleNav && (
          <div>the nav</div>
        )
      }
    </div>
  );
};

export default Search;