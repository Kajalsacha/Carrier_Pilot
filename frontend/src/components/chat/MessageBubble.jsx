import { Bot } from "lucide-react";

function MessageBubble({ message }) {
  if (!message) return null;

  const isUser = message.sender === "user";

  return (
    <div className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#23364D]/10">
          <Bot size={16} className="text-[#23364D]" />
        </span>
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-[15px] ${
          isUser
            ? "bg-[#23364D] text-white"
            : "border border-[#E8EDF3] bg-white text-[#6B7280]"
        }`}
      >
        <p className="whitespace-pre-wrap leading-7">{message.text}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
