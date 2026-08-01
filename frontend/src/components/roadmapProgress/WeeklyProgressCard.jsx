import { CheckCircle2, Circle } from "lucide-react";
import Card from "../common/Card";

function WeeklyProgressCard({ weeklyProgress }) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1F2937]">Weekly Progress</h2>

        <button className="text-sm font-medium text-[#23364D] hover:text-[#1A2838]">
          View All
        </button>
      </div>

      <p className="text-sm font-medium text-[#6B7280]">
        This Week (Week {weeklyProgress.week})
      </p>

      <div className="mt-2 flex items-center gap-3">
        <div className="h-2 flex-1 rounded-full bg-[#F8FAFC]">
          <div
            className="h-full rounded-full bg-[#23364D]"
            style={{ width: `${weeklyProgress.percent}%` }}
          />
        </div>

        <span className="text-sm font-medium text-[#1F2937]">{weeklyProgress.percent}%</span>
      </div>

      <ul className="mt-5 space-y-3">
        {weeklyProgress.checklist.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5 text-sm">
            {item.done ? (
              <CheckCircle2 size={18} className="flex-none text-green-500" />
            ) : (
              <Circle size={18} className="flex-none text-[#E8EDF3]" />
            )}

            <span className={item.done ? "text-[#1F2937]" : "text-[#9CA3AF]"}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default WeeklyProgressCard;
