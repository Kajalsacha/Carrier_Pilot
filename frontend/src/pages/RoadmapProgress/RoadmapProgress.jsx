import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import toast from "react-hot-toast";

import RoadmapHeader from "../../components/roadmapProgress/RoadmapHeader";
import ProgressCards from "../../components/roadmapProgress/ProgressCards";
import WeekTimeline from "../../components/roadmapProgress/WeekTimeline";
import WeeklyProgressCard from "../../components/roadmapProgress/WeeklyProgressCard";
import MentorTipCard from "../../components/roadmapProgress/MentorTipCard";
import QuickActionsCard from "../../components/roadmapProgress/QuickActionsCard";
import WeekPlanModal from "../../components/roadmaps/WeekPlanModal";
import EmptyState from "../../components/common/EmptyState";
import { Skeleton } from "../../components/common/Loader";

import { getRoadmap, downloadRoadmap } from "../../services/roadmapService";
import { generateWeekPlan } from "../../services/weekService";

// Turns the raw roadmap document from the backend into the shape
// the page's components need. The backend only stores the AI-generated
// curriculum (weeks, topics, resources) — it has no concept yet of which
// weeks are "done" or how much time has been spent, so those parts are
// left at their honest just-started defaults instead of being invented.
function buildViewModel(data) {
  const weeksData = data.roadmap?.roadmap || [];
  const totalWeeks = weeksData.length;
  const currentWeekData = weeksData[0];

  return {
    title: data.targetRole,
    status: "In Progress",
    description: "Personalized AI Learning Roadmap",
    duration: data.duration,
    progress: 0,
    completedWeeks: 0,
    totalWeeks,
    currentWeek: currentWeekData?.week || 1,
    currentWeekTitle: currentWeekData?.title || "—",
    weeks: weeksData.map((week, index) => ({
      week: week.week,
      title: week.title,
      subtitle: index === 0 ? "In Progress" : "Not started yet",
      status: index === 0 ? "In Progress" : "Not Started",
    })),
    weeklyProgress: {
      week: currentWeekData?.week || 1,
      percent: 0,
      checklist: (currentWeekData?.topics || []).map((topic) => ({
        label: topic,
        done: false,
      })),
    },
    mentorTip:
      data.roadmap?.learningStrategy ||
      "Stay consistent with your weekly schedule — steady progress beats cramming.",
  };
}

function RoadmapProgress() {
  const { id } = useParams();

  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [weekPlan, setWeekPlan] = useState(null);
  const [showWeekPlanModal, setShowWeekPlanModal] = useState(false);

  useEffect(() => {
    fetchRoadmap();
  }, [id]);

  const fetchRoadmap = async () => {
    try {
      setIsLoading(true);

      const data = await getRoadmap(id);

      setRoadmap(buildViewModel(data));
    } catch (error) {
      toast.error("Failed to load roadmap");
      setRoadmap(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateWeeklyPlan = async () => {
    try {
      setIsGenerating(true);

      const data = await generateWeekPlan(id, roadmap.currentWeek);

      setWeekPlan(data);
      setShowWeekPlanModal(true);
    } catch (error) {
      toast.error("Failed to generate weekly plan");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    downloadRoadmap(id);
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-14 w-2/3 rounded-2xl" />

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-31 rounded-2xl" />
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[7fr_3fr]">
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <EmptyState
        icon={FileQuestion}
        title="Roadmap not found"
        description="This roadmap may have been deleted or the link is incorrect."
        actionLabel="Back to Roadmaps"
        actionTo="/roadmaps"
      />
    );
  }

  return (
    <div>
      <RoadmapHeader
        roadmap={roadmap}
        onDownload={handleDownload}
        onGenerateWeeklyPlan={handleGenerateWeeklyPlan}
        isGenerating={isGenerating}
      />

      <div className="mt-6">
        <ProgressCards roadmap={roadmap} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[7fr_3fr]">
        <WeekTimeline weeks={roadmap.weeks} />

        <div className="space-y-6">
          <WeeklyProgressCard weeklyProgress={roadmap.weeklyProgress} />
          <MentorTipCard tip={roadmap.mentorTip} />
          <QuickActionsCard
            onGenerateWeeklyPlan={handleGenerateWeeklyPlan}
            isGenerating={isGenerating}
          />
        </div>
      </div>

      <WeekPlanModal
        open={showWeekPlanModal}
        onClose={() => setShowWeekPlanModal(false)}
        weekPlan={weekPlan}
      />
    </div>
  );
}

export default RoadmapProgress;
