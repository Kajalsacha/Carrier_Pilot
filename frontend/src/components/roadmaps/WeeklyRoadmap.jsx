import { CalendarDays } from "lucide-react";
import WeekCard from "./WeekCard";

function WeeklyRoadmap({ roadmap }) {
  if (!roadmap || !roadmap.roadmap) {
    return null;
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#23364D]/10">
          <CalendarDays className="text-[#23364D]" size={20} />
        </span>

        <h2 className="text-xl font-semibold text-[#1F2937]">Weekly Roadmap</h2>
      </div>

      <div className="space-y-6">
        {roadmap.roadmap.roadmap.map((week) => (
          <WeekCard key={week.week} week={week} roadmapId={roadmap._id} />
        ))}
      </div>
    </div>
  );
}

export default WeeklyRoadmap;
