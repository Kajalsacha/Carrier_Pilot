import { useState } from "react";
import { Bot, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import toast from "react-hot-toast";

import { analyzeATS } from "../../services/applicationService";
import Modal from "../common/Modal";
import Button from "../common/Button";

function ATSAnalysisModal({ application }) {
  const [open, setOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      return toast.error("Please enter Job Description");
    }

    try {
      setLoading(true);

      const data = await analyzeATS(application._id, jobDescription);

      setResult(data);
    } catch (error) {
      toast.error("Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-[#6B7280] hover:bg-[#F8FAFC]"
      >
        <Bot size={16} />
        Analyze Resume
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="ATS Resume Analysis"
        size="lg"
      >
        <textarea
          rows={6}
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full rounded-xl border border-[#E8EDF3] bg-white p-4 text-[15px] text-[#1F2937] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#23364D] focus:ring-4 focus:ring-[#23364D]/10"
        />

        <Button onClick={handleAnalyze} loading={loading} className="mt-4">
          Analyze Resume
        </Button>

        {result && (
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-[#6B7280]">ATS Score</h3>

              <p className="mt-1 text-4xl font-semibold text-emerald-600">
                {result.atsScore}%
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <h3 className="flex items-center gap-2 font-semibold text-emerald-800">
                <CheckCircle2 size={18} />
                Strengths
              </h3>

              <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-emerald-900">
                {result.strengths.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <h3 className="flex items-center gap-2 font-semibold text-amber-800">
                <AlertTriangle size={18} />
                Skill Gaps
              </h3>

              <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-amber-900">
                {result.skillGaps.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <h3 className="flex items-center gap-2 font-semibold text-blue-800">
                <Lightbulb size={18} />
                Resume Improvements
              </h3>

              <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-blue-900">
                {result.resumeImprovements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ATSAnalysisModal;
