import { Search, Bell, Menu, ChevronDown, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ActionMenu from "../common/ActionMenu";

const PAGE_INFO = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Here's an overview of your applications.",
  },
  "/applications": {
    title: "Applications",
    subtitle: "Track and manage your job applications.",
  },
  "/analytics": {
    title: "Analytics",
    subtitle: "Insights into your job search performance.",
  },
  "/roadmaps": {
    title: "AI Roadmaps",
    subtitle: "Personalized learning paths to your goal role.",
  },
  "/chat": {
    title: "AI Mentor",
    subtitle: "Get guidance from your AI career mentor.",
  },
  "/profile": {
    title: "Profile",
    subtitle: "Manage your account information.",
  },
};

function Navbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { title, subtitle } =
    Object.entries(PAGE_INFO).find(([path]) => pathname.startsWith(path))?.[1] ||
    PAGE_INFO["/dashboard"];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-[#E8EDF3] bg-white px-6 lg:px-8">

      {/* Left */}

      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="text-[#6B7280] hover:text-[#1F2937] lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-2xl font-semibold text-[#1F2937]">
            {title}
          </h2>

          <p className="mt-0.5 text-sm text-[#6B7280]">
            {subtitle}
          </p>
        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />

          <input
            type="text"
            placeholder="Search applications, roadmaps..."
            className="w-64 rounded-xl border border-[#E8EDF3] bg-white py-2.5 pl-10 pr-4 text-sm text-[#1F2937] outline-none transition focus:border-[#23364D] focus:ring-4 focus:ring-[#23364D]/10"
          />

        </div>

        {/* Notification */}

        <button
          aria-label="Notifications"
          className="relative rounded-xl border border-[#E8EDF3] p-2.5 text-[#6B7280] transition hover:bg-[#F8FAFC] hover:text-[#1F2937]"
        >
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />
        </button>

        {/* Profile dropdown */}

        <ActionMenu
          ariaLabel="Open profile menu"
          trigger={
            <>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#23364D] font-semibold text-white">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </span>

              <span className="hidden text-sm font-medium text-[#1F2937] sm:block">
                {user?.name ? user.name.split(" ")[0] : "User"}
              </span>

              <ChevronDown size={16} className="hidden text-[#6B7280] sm:block" />
            </>
          }
        >
          <div className="border-b border-[#E8EDF3] px-3.5 py-2.5">
            <p className="text-sm font-medium text-[#1F2937]">{user?.name || "User"}</p>
            <p className="truncate text-xs text-[#9CA3AF]">{user?.email}</p>
          </div>

          <Link
            to="/profile"
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-[#6B7280] hover:bg-[#F8FAFC]"
          >
            <User size={16} />
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </ActionMenu>
      </div>

    </header>
  );
}

export default Navbar;
