import { ArrowLeft, Download, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const STATUS_BADGE = {
  Completed: "bg-green-50 text-green-700 border-green-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  "Not Started": "bg-[#F8FAFC] text-[#6B7280] border-[#E8EDF3]",
};

function RoadmapHeader({ roadmap, onDownload, onGenerateWeeklyPlan, isGenerating }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-4">
        <button
          onClick={() => navigate("/roadmaps")}
          aria-label="Back to roadmaps"
          className="mt-1 flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-[#E8EDF3] text-[#6B7280] transition hover:bg-[#F8FAFC] hover:text-[#1F2937]"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-[#1F2937]">{roadmap.title}</h1>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                STATUS_BADGE[roadmap.status] || STATUS_BADGE["Not Started"]
              }`}
            >
              {roadmap.status}
            </span>
          </div>

          <p className="mt-1 text-sm text-[#9CA3AF]">{roadmap.description}</p>
        </div>
      </div>

      <div className="flex flex-none gap-3">
        <Button variant="secondary" onClick={onDownload}>
          <Download size={16} />
          Download PDF
        </Button>

        <Button onClick={onGenerateWeeklyPlan} loading={isGenerating}>
          <Sparkles size={16} />
          Generate Weekly Plan
        </Button>
      </div>
    </div>
  );
}

export default RoadmapHeader;
