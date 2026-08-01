import { useState } from "react";
import { Target, BookOpen, FolderGit2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

import { generateWeekPlan } from "../../services/weekService";
import WeekPlanModal from "./WeekPlanModal";
import Card from "../common/Card";
import Button from "../common/Button";

function WeekCard({ week, roadmapId }) {
  const [loading, setLoading] = useState(false);
  const [weekPlan, setWeekPlan] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const data = await generateWeekPlan(roadmapId, week.week);

      setWeekPlan(data);
      setOpenModal(true);
    } catch (error) {
      toast.error("Failed to generate study plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1F2937]">
            Week {week.week}
          </h2>

          <span className="rounded-full bg-[#23364D]/10 px-3 py-1 text-sm font-medium text-[#23364D]">
            {week.duration}
          </span>
        </div>

        <h3 className="mt-3 text-base font-semibold text-[#23364D]">
          {week.title}
        </h3>

        {/* Objective */}

        <div className="mt-6">
          <div className="mb-2 flex items-center gap-2">
            <Target className="text-[#23364D]" size={16} />
            <h4 className="text-sm font-semibold text-[#23364D]">Objective</h4>
          </div>

          <p className="leading-7 text-[#6B7280]">{week.objective}</p>
        </div>

        {/* Topics */}

        <div className="mt-6">
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="text-[#23364D]" size={16} />
            <h4 className="text-sm font-semibold text-[#23364D]">Topics</h4>
          </div>

          <ul className="list-disc space-y-1.5 pl-5 text-[#6B7280]">
            {week.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>

        {/* Resources */}

        <div className="mt-6 space-y-3">
          {week.resources.map((resource, index) => (
            <div key={index} className="rounded-lg border border-[#E8EDF3] p-4">
              <h4 className="font-semibold text-[#1F2937]">{resource.title}</h4>

              <p className="mt-1 text-sm font-medium text-[#23364D]">
                {resource.category}
              </p>

              <p className="mt-2 text-[#6B7280]">{resource.reason}</p>
            </div>
          ))}
        </div>

        {/* Mini Project */}

        <div className="mt-6">
          <div className="mb-2 flex items-center gap-2">
            <FolderGit2 className="text-[#23364D]" size={16} />
            <h4 className="text-sm font-semibold text-[#23364D]">Mini Project</h4>
          </div>

          <p className="leading-7 text-[#6B7280]">{week.project}</p>
        </div>

        {/* Outcome */}

        <div className="mt-6">
          <h4 className="mb-2 text-sm font-semibold text-[#23364D]">
            Expected Outcome
          </h4>

          <p className="leading-7 text-[#6B7280]">{week.expectedOutcome}</p>
        </div>

        <Button onClick={handleGenerate} loading={loading} className="mt-6">
          <Sparkles size={16} />
          Generate Detailed Week
        </Button>
      </Card>

      <WeekPlanModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        weekPlan={weekPlan}
      />
    </>
  );
}

export default WeekCard;
