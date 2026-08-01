import WeekCard from "./WeekCard";

function WeekTimeline({ weeks }) {
  return (
    <div className="rounded-2xl border border-[#E8EDF3] bg-white p-6 shadow-lg shadow-slate-200/40">
      <h2 className="mb-6 text-lg font-semibold text-[#1F2937]">Roadmap Progress</h2>

      <div className="relative">
        {/* connecting vertical line */}
        <div className="absolute bottom-2 left-4 top-2 w-px bg-[#E8EDF3]" />

        <div className="space-y-5">
          {weeks.map((week) => (
            <WeekCard key={week.week} week={week} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeekTimeline;
