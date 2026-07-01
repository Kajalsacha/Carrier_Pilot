import { Search, Bell } from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[#2C2C2C] bg-[#121212] px-8">

      {/* Left */}

      <div>

        <h2 className="text-3xl font-bold text-white">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-[#888888]">
          Manage your applications efficiently.
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-[#2C2C2C] bg-[#1A1A1A] py-3 pl-11 pr-4 text-white outline-none transition focus:border-white"
          />

        </div>

        {/* Notification */}

        <button className="rounded-xl border border-[#2C2C2C] bg-[#1A1A1A] p-3 text-[#B0B0B0] transition hover:text-white">

          <Bell size={20} />

        </button>

        {/* Avatar */}

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0E0E0] font-semibold text-[#121212]">

          K

        </div>

      </div>

    </header>
  );
}

export default Navbar;