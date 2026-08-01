import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import { generateRoadmap } from "../../services/roadmapService";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";

function GenerateRoadmapModal({ fetchRoadmaps }) {
  const [open, setOpen] = useState(false);

  const [targetRole, setTargetRole] = useState("");
  const [dreamCompany, setDreamCompany] = useState("");
  const [duration, setDuration] = useState("3 Months");
  const [studyHours, setStudyHours] = useState("");
  const [experience, setExperience] = useState("Beginner");
  const [currentSkills, setCurrentSkills] = useState("");

  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await generateRoadmap({
        targetRole,
        dreamCompany,
        duration,
        studyHours,
        experience,
        currentSkills,
      });

      toast.success("Roadmap Generated Successfully");

      setTargetRole("");
      setDreamCompany("");
      setDuration("3 Months");
      setStudyHours("");
      setExperience("Beginner");
      setCurrentSkills("");

      setOpen(false);

      fetchRoadmaps();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus size={18} />
        Generate Roadmap
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Generate AI Roadmap" size="lg">
        <form onSubmit={handleGenerate} className="space-y-5">
          <Input
            label="Target role"
            type="text"
            placeholder="e.g. Frontend Engineer"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            required
          />

          <Input
            label="Dream company"
            type="text"
            placeholder="e.g. Google"
            value={dreamCompany}
            onChange={(e) => setDreamCompany(e.target.value)}
            required
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1F2937]">
                Experience level
              </label>

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-xl border border-[#E8EDF3] bg-white px-3.5 py-2.5 text-[15px] text-[#1F2937] outline-none transition focus:border-[#23364D] focus:ring-4 focus:ring-[#23364D]/40"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1F2937]">
                Roadmap duration
              </label>

              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-xl border border-[#E8EDF3] bg-white px-3.5 py-2.5 text-[15px] text-[#1F2937] outline-none transition focus:border-[#23364D] focus:ring-4 focus:ring-[#23364D]/40"
              >
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
              </select>
            </div>
          </div>

          <Input
            label="Current skills"
            type="text"
            placeholder="Comma separated, e.g. HTML, CSS, JavaScript"
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
          />

          <Input
            label="Study hours per day"
            type="number"
            placeholder="e.g. 2"
            value={studyHours}
            onChange={(e) => setStudyHours(e.target.value)}
          />

          <Button type="submit" loading={loading} className="w-full">
            Generate Roadmap
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default GenerateRoadmapModal;
