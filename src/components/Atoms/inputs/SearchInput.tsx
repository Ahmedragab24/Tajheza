import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React, { useId } from "react";

const SearchInput = () => {
  const id = useId();

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <Input
        id={id}
        className="peer w-md h-11 ps-8 pe-10 bg-white rounded-full"
        placeholder="Search..."
        type="search"
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
    </div>
  );
};

export default SearchInput;
