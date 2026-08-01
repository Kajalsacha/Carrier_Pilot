import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  Brain,
  MessageSquare,
  User,
  LogOut,
  Compass,
  X,
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

function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile backdrop */}

      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col bg-[#1E2A3B] transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Logo */}

        <div className="flex items-center justify-between gap-2 border-b border-white/10 p-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#32475B]">
              <Compass className="h-4.5 w-4.5 text-white" />
            </span>

            <div>
              <h1 className="text-base font-semibold text-white">
                CareerPilot
              </h1>

              <p className="text-xs text-white/50">
                AI Job Application Tracker
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-white/50 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}

        <nav className="flex-1 space-y-1 p-4">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#32475B] text-white"
                      : "text-white/60 hover:bg-[#2C3E50] hover:text-white"
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

        <div className="border-t border-white/10 p-4">

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/60 transition hover:bg-[#2C3E50] hover:text-white"
          >
            <LogOut size={20} />

            Logout
          </button>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;
