import { useEffect, useRef } from "react";
import { Bot, Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";

const STARTER_PROMPTS = [
  "Help me prepare for a DSA interview",
  "Review my resume for a frontend role",
  "How do I switch careers into tech?",
  "Give me mock interview questions",
];

function ChatMessages({ messages, loading, onSend }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#23364D]/10">
          <Sparkles className="text-[#23364D]" size={22} />
        </span>

        <p className="font-medium text-[#1F2937]">Ask your AI Mentor anything</p>

        <p className="mt-1 max-w-sm text-sm text-[#9CA3AF]">
          Get guidance on DSA, web development, your resume, interviews, or your
          career path.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onSend(prompt)}
              className="rounded-full border border-[#E8EDF3] px-4 py-2 text-sm text-[#6B7280] transition hover:border-[#E8EDF3] hover:bg-[#23364D]/10 hover:text-[#1A2838]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-5 overflow-y-auto p-6">
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}

      {loading && (
        <div className="flex items-end justify-start gap-3">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#23364D]/10">
            <Bot size={16} className="text-[#23364D]" />
          </span>

          <div className="flex items-center gap-1 rounded-2xl border border-[#E8EDF3] bg-white px-4 py-3.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9CA3AF] [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9CA3AF] [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9CA3AF]" />
          </div>
        </div>
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatMessages;
