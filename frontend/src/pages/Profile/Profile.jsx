import { useNavigate } from "react-router-dom";
import { LogOut, Mail, User as UserIcon, Calendar } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { Skeleton } from "../../components/common/Loader";

function getMemberSince(id) {
  if (!id) return "—";

  const timestamp = parseInt(id.substring(0, 8), 16) * 1000;

  return new Date(timestamp).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div>
        <Skeleton className="h-9 w-40" />
        <Skeleton className="mt-2 h-5 w-64" />
        <Skeleton className="mt-8 h-96 max-w-2xl rounded-2xl" />
      </div>
    );
  }

  const infoRows = [
    { label: "Full Name", value: user.name, icon: UserIcon },
    { label: "Email Address", value: user.email, icon: Mail },
    { label: "Member Since", value: getMemberSince(user._id), icon: Calendar },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-[#1F2937]">Profile</h1>

      <p className="mt-1.5 text-[#9CA3AF]">Manage your account information.</p>

      <Card className="mt-8 max-w-2xl p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-[#23364D] text-2xl font-semibold text-white">
            {user.name?.[0]?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#1F2937]">{user.name}</h2>
            <p className="text-sm text-[#9CA3AF]">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 divide-y divide-[#E8EDF3] border-t border-[#E8EDF3]">
          {infoRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-4">
              <span className="flex items-center gap-2.5 text-sm text-[#9CA3AF]">
                <row.icon size={16} />
                {row.label}
              </span>

              <span className="text-sm font-medium text-[#1F2937]">{row.value}</span>
            </div>
          ))}
        </div>

        <Button variant="secondary" onClick={handleLogout} className="mt-8 w-full">
          <LogOut size={16} />
          Log Out
        </Button>
      </Card>
    </div>
  );
}

export default Profile;
