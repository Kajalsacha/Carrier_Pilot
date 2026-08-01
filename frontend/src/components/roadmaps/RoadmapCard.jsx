import { Download, Trash2, Briefcase, Building2, Clock, Eye } from "lucide-react";
import toast from "react-hot-toast";

import { deleteRoadmap, downloadRoadmap } from "../../services/roadmapService";
import Card from "../common/Card";
import Button from "../common/Button";

function RoadmapCard({ roadmap, fetchRoadmaps, onView }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this roadmap?");

    if (!confirmDelete) return;

    try {
      await deleteRoadmap(roadmap._id);

      toast.success("Roadmap Deleted");

      fetchRoadmaps();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <Card className="p-6 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#23364D]/10">
            <Briefcase className="text-[#23364D]" size={18} />
          </span>

          <h2 className="text-lg font-semibold text-[#1F2937]">
            {roadmap.targetRole}
          </h2>
        </div>

        <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
          <Building2 size={16} />
          <span>{roadmap.dreamCompany}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
          <Clock size={16} />
          <span>{roadmap.duration}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => onView(roadmap)} className="flex-1">
          <Eye size={16} />
          View
        </Button>

        <Button size="sm" onClick={() => downloadRoadmap(roadmap._id)} className="flex-1">
          <Download size={16} />
          PDF
        </Button>

        <button
          onClick={handleDelete}
          aria-label="Delete roadmap"
          className="rounded-xl border border-red-200 p-2.5 text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </Card>
  );
}

export default RoadmapCard;
