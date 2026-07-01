const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const askCareerMentor = async (roadmap, question) => {

  const prompt = `
You are CareerPilot AI.

The student already has this career roadmap:

${JSON.stringify(roadmap, null, 2)}

Student Question:
${question}

Instructions:

- Answer only based on the roadmap whenever possible.
- Give practical and beginner-friendly guidance.
- Keep the answer clear and concise.
- If the student asks about learning resources, suggest relevant ones.
- If the student asks for motivation, encourage them.
`;

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