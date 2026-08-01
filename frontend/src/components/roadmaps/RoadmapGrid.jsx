import { Compass } from "lucide-react";
import RoadmapCard from "./RoadmapCard";
import EmptyState from "../common/EmptyState";
import { Skeleton } from "../common/Loader";

function RoadmapGrid({ roadmaps, fetchRoadmaps, onView, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-52 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (roadmaps.length === 0) {
    return (
      <EmptyState
        icon={Compass}
        title="No roadmaps yet"
        description="Generate your first AI roadmap to begin your learning journey."
        className="rounded-2xl border border-dashed border-[#E8EDF3]"
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {roadmaps.map((roadmap) => (
        <RoadmapCard
          key={roadmap._id}
          roadmap={roadmap}
          fetchRoadmaps={fetchRoadmaps}
          onView={onView}
        />
      ))}
    </div>
  );
}

export default RoadmapGrid;
