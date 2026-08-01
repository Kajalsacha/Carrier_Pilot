import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import RoadmapDetailsModal from "../../components/roadmaps/RoadmapDetailsModal";
import GenerateRoadmapModal from "../../components/roadmaps/GenerateRoadmapModal";
import RoadmapGrid from "../../components/roadmaps/RoadmapGrid";

import { getRoadmaps } from "../../services/roadmapService";

function Roadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const data = await getRoadmaps();

      setRoadmaps(data);
    } catch (error) {
      toast.error("Failed to load roadmaps");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1F2937]">
            AI Roadmaps
          </h1>

          <p className="mt-1.5 text-[#9CA3AF]">
            Generate personalized AI learning roadmaps.
          </p>
        </div>

        <GenerateRoadmapModal fetchRoadmaps={fetchRoadmaps} />
      </div>

      {/* Roadmaps */}

      <div className="mt-8">
        <RoadmapGrid
          roadmaps={roadmaps}
          fetchRoadmaps={fetchRoadmaps}
          onView={setSelectedRoadmap}
          isLoading={isLoading}
        />
      </div>

      <RoadmapDetailsModal
        roadmap={selectedRoadmap}
        onClose={() => setSelectedRoadmap(null)}
      />
    </div>
  );
}

export default Roadmaps;
