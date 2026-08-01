import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import Card from "../common/Card";

function MonthlyApplicationsChart({ applications }) {
  const monthlyData = useMemo(() => {
    const counts = {};

    const sortedByDate = [...applications].sort(
      (a, b) => new Date(a.appliedDate) - new Date(b.appliedDate)
    );

    sortedByDate.forEach((application) => {
      const month = format(new Date(application.appliedDate), "MMM yyyy");
      counts[month] = (counts[month] || 0) + 1;
    });

    return Object.entries(counts).map(([month, count]) => ({ month, count }));
  }, [applications]);

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold text-[#1F2937]">
        Applications Over Time
      </h2>

      <div className="h-72">
        <ResponsiveContainer>
          <BarChart data={monthlyData}>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip cursor={{ fill: "#f9fafb" }} />
            <Bar dataKey="count" fill="#23364D" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default MonthlyApplicationsChart;
