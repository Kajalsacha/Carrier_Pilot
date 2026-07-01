import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative w-full">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8E8E]"
      />

      <input
        type="text"
        placeholder="Search company..."
        className="w-full rounded-xl border border-[#2F2F2F] bg-[#1A1A1A] py-3 pl-11 pr-4 text-white outline-none focus:border-white"
      />

    </div>
  );
}

export default SearchBar;