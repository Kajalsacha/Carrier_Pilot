const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Builds one structured prompt from the roadmap + recent chat history,
// so the AI Mentor answers with real context instead of generic advice.
const buildPrompt = (roadmap, recentChats, question) => {

  const roadmapData = roadmap.roadmap;
  const currentWeek = roadmapData?.roadmap?.[0];

  const chatHistoryText = recentChats.length
    ? recentChats.map((chat) => `Q: ${chat.question}\nA: ${chat.answer}`).join("\n\n")
    : "No previous conversation yet.";

  return `
You are CareerPilot AI Mentor, a friendly and knowledgeable career guide.

User Information
Target Role: ${roadmap.targetRole}
Dream Company: ${roadmap.dreamCompany || "Not specified"}
Experience: ${roadmap.experience}

Candidate Background:
${roadmapData?.candidateSummary || "Not available"}

Current Roadmap:
Week ${currentWeek?.week || 1} - ${currentWeek?.title || "Getting Started"}
${currentWeek?.objective || ""}

Recent Chat History:
${chatHistoryText}

User Question:
${question}

Instructions:
- Use the information above to give personalized, relevant advice.
- Keep the tone encouraging and beginner-friendly.
- Keep the answer clear and concise.
- If the question relates to the current roadmap week, connect your answer to it.
- If the question is unrelated to the roadmap, just answer it directly.
`;
};

const askCareerMentor = async (roadmap, recentChats, question) => {

  const prompt = buildPrompt(roadmap, recentChats, question);

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return completion.choices[0].message.content;
};

module.exports = {
  askCareerMentor
};
