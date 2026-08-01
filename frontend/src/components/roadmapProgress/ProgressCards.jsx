import StatCard from "../dashboard/StatCard";

function ProgressCards({ roadmap }) {
  const cards = [
    {
      title: "Overall Progress",
      value: `${roadmap.progress}%`,
      subtitle: `${roadmap.completedWeeks} / ${roadmap.totalWeeks} weeks completed`,
      progressPercent: roadmap.progress,
    },
    {
      title: "Completed Weeks",
      value: roadmap.completedWeeks,
      subtitle: `Out of ${roadmap.totalWeeks} weeks`,
    },
    {
      title: "Current Week",
      value: `Week ${roadmap.currentWeek}`,
      subtitle: roadmap.currentWeekTitle,
    },
    {
      title: "Current Topic",
      value: roadmap.currentWeekTitle,
    },
    {
      title: "Roadmap Duration",
      value: roadmap.duration,
      subtitle: `${roadmap.totalWeeks} weeks total`,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}

export default ProgressCards;
