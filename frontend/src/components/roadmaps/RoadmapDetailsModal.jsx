import CandidateSection from "./CandidateSection";
import CareerSections from "./CareerSections";
import WeeklyRoadmap from "./WeeklyRoadmap";
import Modal from "../common/Modal";

function RoadmapDetailsModal({ roadmap, onClose }) {
  if (!roadmap) return null;

  const aiRoadmap = roadmap.roadmap;

  return (
    <Modal
      open
      onClose={onClose}
      title={roadmap.targetRole}
      subtitle="Personalized AI Learning Roadmap"
      size="full"
    >
      <div className="space-y-10">
        <CandidateSection roadmap={aiRoadmap} />

        <WeeklyRoadmap roadmap={roadmap} />

        <CareerSections roadmap={aiRoadmap} />
      </div>
    </Modal>
  );
}

export default RoadmapDetailsModal;
