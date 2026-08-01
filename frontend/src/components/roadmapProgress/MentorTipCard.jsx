import { Bot } from "lucide-react";
import Card from "../common/Card";

function MentorTipCard({ tip }) {
  return (
    <Card className="border-violet-100 bg-violet-50/60 p-6">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
          <Bot size={18} className="text-violet-600" />
        </span>

        <h2 className="text-base font-semibold text-[#1F2937]">AI Mentor Tip</h2>
      </div>

      <p className="text-sm leading-6 text-[#6B7280]">{tip}</p>
    </Card>
  );
}

export default MentorTipCard;
