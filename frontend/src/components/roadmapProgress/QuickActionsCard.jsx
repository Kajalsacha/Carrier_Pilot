import { Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";

function QuickActionsCard({ onGenerateWeeklyPlan, isGenerating }) {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Sparkles,
      title: "Generate Weekly Plan",
      subtitle: isGenerating ? "Generating..." : "Get an AI personalized plan for this week",
      onClick: onGenerateWeeklyPlan,
      disabled: isGenerating,
    },
    {
      icon: MessageSquare,
      title: "Ask AI Mentor",
      subtitle: "Get help with your current topic",
      onClick: () => navigate("/chat"),
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#1F2937]">Quick Actions</h2>

      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={action.onClick}
            disabled={action.disabled}
            className="flex w-full items-center gap-3 rounded-xl border border-[#E8EDF3] p-3.5 text-left transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[#23364D]/10">
              <action.icon size={18} className="text-[#23364D]" />
            </span>

            <span className="flex-1">
              <span className="block text-sm font-medium text-[#1F2937]">{action.title}</span>
              <span className="block text-xs text-[#9CA3AF]">{action.subtitle}</span>
            </span>

            <ArrowRight size={16} className="flex-none text-[#9CA3AF]" />
          </button>
        ))}
      </div>
    </Card>
  );
}

export default QuickActionsCard;
