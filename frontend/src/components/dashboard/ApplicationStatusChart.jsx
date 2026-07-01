import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#E0E0E0",
  "#B0B0B0",
  "#888888",
  "#555555",
  "#333333",
];
function ApplicationStatusChart({ stats }) {
  const data = [
    { name: "Applied", value: stats.applied },
    { name: "OA", value: stats.oa },
    { name: "Interview", value: stats.interview },
    { name: "Offer", value: stats.offer },
    { name: "Rejected", value: stats.rejected },
  ];

  return (
    <div className="mt-8 rounded-2xl border border-[#2C2C2C] bg-[#181818] p-6">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Application Status
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={110}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ApplicationStatusChart;