const Groq = require("groq-sdk");
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


const generateRoadmapAI = async (userData) => {

  const {
    targetRole,
    dreamCompany,
    duration,
    studyHours,
    experience,
    currentSkills
  } = userData;

 

const prompt = `
You are an Expert Career Coach, Senior Software Engineer, Hiring Manager and Technical Mentor with 15+ years of industry experience.

Your job is to generate a highly personalized, professional and practical learning roadmap for a software engineer.

This roadmap will be displayed inside an AI-powered platform called CareerPilot.

Every recommendation must be customized according to the user's:

- Target Role
- Dream Company
- Experience
- Current Skills
- Available Study Hours
- Duration

-----------------------------------------
Candidate Details
-----------------------------------------

Target Role:
${targetRole}

Dream Company:
${dreamCompany}

Experience:
${experience}

Current Skills:
${currentSkills}

Study Hours Per Day:
${studyHours}

Duration:
${duration}

-----------------------------------------
Instructions
-----------------------------------------

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT wrap the response inside code blocks.

Do NOT include explanations.

Do NOT write anything outside the JSON.

The JSON must follow this exact structure:

{
  "candidateSummary":"",
  "learningStrategy":"",
  "roadmap":[
    {
      "week":1,
      "title":"",
      "duration":"",
      "objective":"",
      "topics":[],
      "resources":[],
      "project":"",
      "expectedOutcome":""
    }
  ],
  "projects":[
    {
      "title":"",
      "difficulty":"",
      "description":"",
      "techStack":[],
      "resumeValue":""
    }
  ],
  "interviewPreparation":"",
  "resources":[
    {
      "title":"",
      "category":"",
      "reason":""
    }
  ],
  "commonMistakes":[],
  "portfolioProject":{
    "title":"",
    "description":"",
    "modules":[],
    "techStack":[]
  },
  "finalChecklist":[]
}

-----------------------------------------
Content Rules
-----------------------------------------

1. Candidate Summary

Write 80-100 words.

Mention

- Current strengths
- Current weaknesses
- Career potential
- Why this roadmap is suitable

-----------------------------------------

2. Learning Strategy

Write 100-120 words.

Explain

- Learning sequence
- Revision strategy
- Project-based learning
- Consistency tips

-----------------------------------------

3. Weekly Roadmap

Generate a maximum of 12 weeks.

If duration is greater than 12 weeks,
merge similar concepts together while maintaining logical progression.

Every week must include:

- week
- title
- duration
- objective (40-60 words)
- 6-10 learning topics
- exactly 3 learning resources
- one mini project
- expected outcome (30-50 words)

Do NOT generate daily plans.

Progress from beginner to advanced naturally.

-----------------------------------------

4. Projects

Generate exactly THREE resume-worthy projects.

Projects should increase in difficulty.

Every project must include:

- title
- difficulty
- description (60-80 words)
- techStack
- resumeValue

Projects should be realistic and suitable for placement preparation.

-----------------------------------------

5. Learning Resources

Generate exactly FIVE resources.

Prefer

- Official Documentation
- MDN
- React Docs
- Node.js Docs
- JavaScript.info
- Full Stack Open
- FreeCodeCamp
- Roadmap.sh
- GeeksforGeeks
- NeetCode
- Striver

Every resource must include

- title
- category
- reason

-----------------------------------------

6. Interview Preparation

Write one concise interview preparation plan
(120-150 words)

Include

- DSA
- Core Subjects
- SQL
- Resume
- LinkedIn
- GitHub
- Mock Interviews

-----------------------------------------

7. Common Mistakes

Generate exactly EIGHT mistakes.

Each should be one sentence.

-----------------------------------------

8. Portfolio Project

Generate ONE capstone project.

Include

- title
- description (80-100 words)
- modules
- techStack

This should be impressive enough to showcase in interviews.

-----------------------------------------

9. Final Checklist

Generate exactly EIGHT actionable checklist items.

-----------------------------------------

Additional Rules

- Personalize everything.
- Avoid generic advice.
- Do not repeat content.
- Recommend only modern technologies.
- Include coding practice every week.
- Include one mini project every week.
- Ensure roadmap is achievable within available study hours.
- Make recommendations industry-ready.
- Use a professional mentoring tone.
- Ensure JSON is syntactically valid.
- Never return null values.
- Never leave arrays empty.

Generate the roadmap now.
`;

const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",

  temperature: 0.3,

  max_completion_tokens: 3500,

  response_format: {
    type: "json_object"
  },

  messages: [
    {
      role: "system",
      content:
        "You are an expert software engineering career mentor. Always return valid JSON only."
    },
    {
      role: "user",
      content: prompt
    }
  ]
});



const aiResponse = completion.choices[0].message.content;

console.log("Got AI Content");

const cleanResponse = aiResponse
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

console.log("Cleaned Response");

const roadmap = JSON.parse(cleanResponse);

console.log("JSON Parsed");

return roadmap;
};



const analyzeATSAI = async (resumeText, jobDescription) => {

  
  const prompt = `
You are an ATS Resume Analyzer.



Compare the following resume with the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY valid JSON.

{
  "atsScore": 0,
  "strengths": [],
  "skillGaps": [],
  "resumeImprovements": [],
  "careerAdvice": []
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  const cleanResponse = aiResponse
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanResponse);
};




const generateWeekPlanAI = async (roadmap, weekNumber) => {

  const roadmapData =
  typeof roadmap.roadmap === "string"
    ? JSON.parse(roadmap.roadmap)
    : roadmap.roadmap;

const selectedWeek = roadmapData.roadmap.find(
  (week) => week.week === Number(weekNumber)
);

if (!selectedWeek) {
  throw new Error("Week not found");
}

  const prompt = `
You are an Expert Software Engineering Mentor.

Generate a detailed study plan ONLY for Week ${weekNumber}.

Candidate Target Role:
${roadmap.targetRole}

Dream Company:
${roadmap.dreamCompany}

Current Week:

Title:
${selectedWeek.title}

Objective:
${selectedWeek.objective}

Topics:
${selectedWeek.topics.join(", ")}

Mini Project:
${selectedWeek.project}

----------------------------------------

Return ONLY valid JSON.

{
  "week": ${weekNumber},

  "overview":"",

  "days":[

    {

      "day":"Monday",

      "studyTopics":[

        ""

      ],

      "practice":[

        ""

      ],

      "assignment":"",

      "estimatedHours":""

    }

  ],

  "revision":"",

  "miniProject":"",

  "expectedOutcome":""

}

Rules

- Generate exactly 7 days.
- Every day must have different study topics.
- Every day must contain coding practice.
- Every day must contain one assignment.
- Study plan should match the week's objective.
- Keep each day practical.
- Return ONLY JSON.
`;

  const completion = await groq.chat.completions.create({

    model: "llama-3.3-70b-versatile",

    temperature: 0.3,

    response_format: {
      type: "json_object",
    },

    messages: [
      {
        role: "system",
        content:
          "You are an expert software engineering mentor. Return only valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

  });

  const aiResponse =
    completion.choices[0].message.content;

  return JSON.parse(aiResponse);

};



module.exports = {
  generateRoadmapAI,
  analyzeATSAI,
  generateWeekPlanAI,
};