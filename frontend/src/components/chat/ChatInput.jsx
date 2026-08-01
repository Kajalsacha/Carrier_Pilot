import { useState } from "react";
import { Send } from "lucide-react";

function ChatInput({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 border-t border-[#E8EDF3] p-4"
    >
      <input
        type="text"
        placeholder="Ask your AI mentor anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 rounded-xl border border-[#E8EDF3] bg-white px-4 py-3 text-[15px] text-[#1F2937] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#23364D] focus:ring-4 focus:ring-[#23364D]/10"
      />

      <button
        type="submit"
        disabled={loading}
        aria-label="Send message"
        className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#23364D] text-white transition hover:bg-[#1A2838] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send size={18} />
      </button>
    </form>
  );
}

export default ChatInput;
