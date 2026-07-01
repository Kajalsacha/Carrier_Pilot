import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  Brain,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Applications",
    icon: Briefcase,
    path: "/applications",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    title: "AI Roadmaps",
    icon: Brain,
    path: "/roadmaps",
  },
  {
    title: "AI Mentor",
    icon: MessageSquare,
    path: "/chat",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-[#2C2C2C] bg-[#121212]">

      {/* Logo */}

      <div className="border-b border-[#2C2C2C] p-6">
        <h1 className="text-2xl font-bold text-white">
          CareerPilot
        </h1>

        <p className="mt-1 text-sm text-[#888888]">
          AI Job Application Tracker
        </p>
      </div>

      {/* Menu */}

      <nav className="flex-1 p-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-[#E0E0E0] text-[#121212]"
                    : "text-[#B0B0B0] hover:bg-[#1A1A1A] hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="border-t border-[#2C2C2C] p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[#B0B0B0] transition hover:bg-[#1A1A1A] hover:text-white"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>
    </aside>
  );
}

export default Sidebar;