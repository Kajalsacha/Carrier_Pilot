import { CheckCircle2, ChevronDown } from "lucide-react";

const STATUS_BADGE = {
  Completed: "bg-green-50 text-green-700 border-green-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  "Not Started": "bg-[#F8FAFC] text-[#6B7280] border-[#E8EDF3]",
};

function WeekCard({ week }) {
  const badgeClasses = STATUS_BADGE[week.status] || STATUS_BADGE["Not Started"];

  return (
    <div className="relative flex gap-4">
      {/* Timeline circle */}

      <div className="relative z-10 flex-none">
        {week.status === "Completed" ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
            <CheckCircle2 size={18} />
          </span>
        ) : (
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold ${
              week.status === "In Progress"
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-[#E8EDF3] bg-white text-[#9CA3AF]"
            }`}
          >
            {week.week}
          </span>
        )}
      </div>

      {/* Card content */}

      <div className="flex flex-1 items-center justify-between rounded-xl border border-[#E8EDF3] bg-white p-4 shadow-sm transition hover:shadow-md">
        <div>
          <p className="font-medium text-[#1F2937]">
            Week {week.week}: {week.title}
          </p>
          <p className="mt-0.5 text-sm text-[#9CA3AF]">{week.subtitle}</p>
        </div>

        <div className="flex flex-none items-center gap-3">
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeClasses}`}>
            {week.status}
          </span>

          <ChevronDown size={18} className="text-[#9CA3AF]" />
        </div>
      </div>
    </div>
  );
}

export default WeekCard;
