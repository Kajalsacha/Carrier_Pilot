import { useState } from "react";
import toast from "react-hot-toast";

import ChatInput from "../../components/chat/ChatInput";
import ChatMessages from "../../components/chat/ChatMessages";

import { sendMessage } from "../../services/chatService";

function MentorChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (message) => {
    const userMessage = { sender: "user", text: message };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const data = await sendMessage(message);

      const aiMessage = { sender: "ai", text: data.reply };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast.error("Failed to get a response from your AI mentor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[80vh] flex-col rounded-2xl border border-[#E8EDF3] bg-white shadow-sm">
      <div className="border-b border-[#E8EDF3] p-6">
        <h1 className="text-xl font-semibold text-[#1F2937]">AI Mentor</h1>

        <p className="mt-1 text-sm text-[#9CA3AF]">
          Ask anything about DSA, Web Development, Resume, Interviews, or Career.
        </p>
      </div>

      <ChatMessages messages={messages} loading={loading} onSend={handleSend} />

      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  );
}

export default MentorChat;
