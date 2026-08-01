import { User, Brain } from "lucide-react";
import Card from "../common/Card";

function CandidateSection({ roadmap }) {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#23364D]/10">
            <User className="text-[#23364D]" size={20} />
          </span>

          <h2 className="text-xl font-semibold text-[#1F2937]">
            Candidate Summary
          </h2>
        </div>

        <p className="whitespace-pre-wrap leading-7 text-[#6B7280]">
          {roadmap.candidateSummary}
        </p>
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#23364D]/10">
            <Brain className="text-[#23364D]" size={20} />
          </span>

          <h2 className="text-xl font-semibold text-[#1F2937]">
            Learning Strategy
          </h2>
        </div>

        <p className="whitespace-pre-wrap leading-7 text-[#6B7280]">
          {roadmap.learningStrategy}
        </p>
      </Card>
    </div>
  );
}

export default CandidateSection;
