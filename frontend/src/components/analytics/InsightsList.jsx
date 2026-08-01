import { TrendingUp, Target, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import Card from "../common/Card";

function InsightsList({ stats, applications }) {
  const { totalApplications, interview, offer } = stats;

  const interviewRate = totalApplications
    ? Math.round(((interview + offer) / totalApplications) * 100)
    : 0;

  const offerRate = totalApplications
    ? Math.round((offer / totalApplications) * 100)
    : 0;

  const monthCounts = {};

  applications.forEach((application) => {
    const month = format(new Date(application.appliedDate), "MMMM yyyy");
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  });

  const busiestMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0];

  const insights = [
    {
      icon: Target,
      text: `${offerRate}% of your applications have resulted in an offer.`,
    },
    {
      icon: TrendingUp,
      text: `${interviewRate}% of your applications reached interview stage or further.`,
    },
  ];

  if (busiestMonth) {
    insights.push({
      icon: CalendarDays,
      text: `You applied the most in ${busiestMonth[0]}, with ${busiestMonth[1]} applications.`,
    });
  }

  return (
    <Card className="p-6">
      <h2 className="mb-5 text-lg font-semibold text-[#1F2937]">Insights</h2>

      <ul className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;

          return (
            <li key={index} className="flex items-start gap-3">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#23364D]/10">
                <Icon size={16} className="text-[#23364D]" />
              </span>

              <p className="text-sm text-[#6B7280]">{insight.text}</p>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export default InsightsList;
