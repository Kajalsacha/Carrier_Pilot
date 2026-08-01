import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Inbox } from "lucide-react";
import Card from "../common/Card";
import EmptyState from "../common/EmptyState";

const STATUS_COLORS = {
  Applied: "#22c55e",
  OA: "#f97316",
  Interview: "#3b82f6",
  Offer: "#a855f7",
  Rejected: "#ef4444",
};

function ApplicationStatusChart({ stats }) {
  const data = [
    { name: "Applied", value: stats.applied },
    { name: "OA", value: stats.oa },
    { name: "Interview", value: stats.interview },
    { name: "Offer", value: stats.offer },
    { name: "Rejected", value: stats.rejected },
  ];

  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold text-[#1F2937]">
        Application Status
      </h2>

      {total === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No applications yet"
          description="Add your first application to see status breakdown here."
        />
      ) : (
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <div className="h-72 w-full lg:w-1/2">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={70} outerRadius={110}>
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="w-full space-y-3 lg:w-1/2">
            {data.map((entry) => (
              <li key={entry.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-[#6B7280]">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: STATUS_COLORS[entry.name] }}
                  />
                  {entry.name}
                </span>

                <span className="font-medium text-[#1F2937]">{entry.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

export default ApplicationStatusChart;
