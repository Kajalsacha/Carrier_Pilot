import {
  Briefcase,
  Clock3,
  BadgeCheck,
  Trophy,
  XCircle,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Hourglass,
  BookOpen,
  ArrowUp,
} from "lucide-react";
import Card from "../common/Card";

const icons = {
  "Total Applications": BarChart3,
  Applied: Briefcase,
  "Online Assessment": Clock3,
  Interview: BadgeCheck,
  Offer: Trophy,
  Rejected: XCircle,
  "Interview Rate": TrendingUp,
  "Offer Rate": Trophy,
  "Rejection Rate": XCircle,
  "Overall Progress": TrendingUp,
  "Completed Weeks": CheckCircle2,
  "Current Week": Calendar,
  "Time Spent": Clock3,
  "Estimated Time Left": Hourglass,
  "Current Topic": BookOpen,
  "Roadmap Duration": Clock3,
};

function StatCard({ title, value, suffix = "", subtitle, trend, progressPercent }) {
  const Icon = icons[title];

  return (
    <Card className="p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-[#6B7280]">{title}</p>

        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#23364D]/10">
            <Icon size={18} className="text-[#23364D]" />
          </span>
        )}
      </div>

      <h2 className="text-3xl font-semibold tracking-tight text-[#1F2937]">
        {value}
        {suffix}
      </h2>

      <div className="mt-2 flex items-center gap-2">
        {trend > 0 && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
            <ArrowUp size={12} />+{trend} this month
          </span>
        )}

        {subtitle && <p className="text-xs text-[#9CA3AF]">{subtitle}</p>}
      </div>

      {progressPercent !== undefined && (
        <div className="mt-3 h-1.5 w-full rounded-full bg-[#F8FAFC]">
          <div
            className="h-full rounded-full bg-[#23364D]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </Card>
  );
}

export default StatCard;
