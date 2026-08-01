import { Search } from "lucide-react";

function SearchBar({ searchCompany, setSearchCompany }) {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
      />

      <input
        type="text"
        placeholder="Search company..."
        value={searchCompany}
        onChange={(e) => setSearchCompany(e.target.value)}
        className="w-full rounded-xl border border-[#E8EDF3] bg-white py-2.5 pl-10 pr-4 text-sm text-[#1F2937] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#23364D] focus:ring-4 focus:ring-[#23364D]/10"
      />
    </div>
  );
}

export default SearchBar;
