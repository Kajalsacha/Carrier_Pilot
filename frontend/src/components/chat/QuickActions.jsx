import { FileText, HelpCircle, Map, TrendingUp, Briefcase } from "lucide-react";

const QUICK_ACTIONS = [
  {
    label: "Review Resume",
    icon: FileText,
    prompt: "Can you review my resume and suggest improvements?",
  },
  {
    label: "Interview Questions",
    icon: HelpCircle,
    prompt: "Give me some common interview questions for my target role.",
  },
  {
    label: "Roadmap Help",
    icon: Map,
    prompt: "Can you help me understand my current roadmap week better?",
  },
  {
    label: "Improve ATS Score",
    icon: TrendingUp,
    prompt: "How can I improve my resume's ATS score?",
  },
  {
    label: "Career Advice",
    icon: Briefcase,
    prompt: "Can you give me some career advice based on my goals?",
  },
];

function QuickActions({ onSelect }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.label}
          onClick={() => onSelect(action.prompt)}
          className="flex items-center gap-2 rounded-full border border-[#E8EDF3] bg-white px-4 py-2 text-sm font-medium text-[#6B7280] transition hover:border-[#23364D]/30 hover:bg-[#23364D]/5 hover:text-[#23364D]"
        >
          <action.icon size={15} />
          {action.label}
        </button>
      ))}
    </div>
  );
}

export default QuickActions;
