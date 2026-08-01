import { cn } from "../../lib/utils";

export const STATUS_STYLES = {
  Applied: "bg-green-50 text-green-700 border-green-200",
  OA: "bg-orange-50 text-orange-700 border-orange-200",
  Interview: "bg-blue-50 text-blue-700 border-blue-200",
  Offer: "bg-purple-50 text-purple-700 border-purple-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};

const DEFAULT_STYLE = "bg-[#F8FAFC] text-[#6B7280] border-[#E8EDF3]";

function Badge({ status, className = "", children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        STATUS_STYLES[status] || DEFAULT_STYLE,
        className
      )}
    >
      {children ?? status}
    </span>
  );
}

export default Badge;
