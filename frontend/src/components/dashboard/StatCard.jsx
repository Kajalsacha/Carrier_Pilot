import {
  Briefcase,
  Clock3,
  BadgeCheck,
  Trophy,
  XCircle,
  BarChart3,
} from "lucide-react";

const icons = {
  "Total Applications": BarChart3,
  Applied: Briefcase,
  "Online Assessment": Clock3,
  Interview: BadgeCheck,
  Offer: Trophy,
  Rejected: XCircle,
};

function StatCard({ title, value }) {
  const Icon = icons[title];

  return (
    <div
      className="
      group
      rounded-2xl
      border
      border-[#2F2F2F]
      bg-gradient-to-br
      from-[#1E1E1E]
      to-[#171717]
      p-6
      shadow-lg
      shadow-black/30
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-[#4A4A4A]
      hover:shadow-2xl
      hover:shadow-black/40
      "
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="h-1 w-14 rounded-full bg-[#E0E0E0]" />

        {Icon && (
          <Icon
            size={22}
            className="text-[#B0B0B0] group-hover:text-white"
          />
        )}
      </div>

      <p className="text-sm text-[#888888]">
        {title}
      </p>

      <h2 className="mt-4 text-5xl font-extrabold tracking-tight text-white">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;