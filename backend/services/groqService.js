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
You are an expert Software Engineering Career Mentor and Placement Coach.

Your responsibility is to create a highly personalized career roadmap for students who want to prepare for software engineering internships and placements.

The roadmap should be practical, realistic, industry-oriented, and suitable for beginners as well as intermediate learners.

--------------------------
STUDENT INFORMATION
--------------------------

Target Role:
${targetRole}

Dream Company:
${dreamCompany}

Current Skills:
${currentSkills.join(", ")}

Experience Level:
${experience}

Duration:
${duration}

Daily Study Hours:
${studyHours} hours

--------------------------
YOUR TASK
--------------------------

Analyze the student's current skills and compare them with the skills required for the target role.

Generate a complete career guidance plan.

The roadmap must be personalized.

Do NOT generate generic advice.

The roadmap should consider:

• Current skills
• Missing skills
• Duration available
• Daily study hours
• Target company expectations
• Industry best practices

--------------------------
INCLUDE
--------------------------

1. Career Goal

2. Estimated Readiness Percentage

3. Short Summary

4. Student Strengths

5. Missing Skills

6. Weekly Learning Roadmap

For every week include:

• Week Number

• Topics to Learn

• Practical Tasks

• One Mini Project

• Learning Resources

• Expected Outcome

7. Recommended Portfolio Projects

8. Recommended Resources

Include:

• Documentation

• YouTube Channels

• Courses

• Practice Platforms

9. Interview Preparation

Include:

• Technical Topics

• HR Questions

• Behavioral Topics

10. Daily Study Plan

Generate a realistic study schedule according to the daily study hours.

11. Final Motivation

Write a short motivational message.

--------------------------
IMPORTANT
--------------------------

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT use triple backticks.

Do NOT explain anything.

Do NOT write introductory sentences.

Do NOT write:
"Here is your roadmap"

Return ONLY JSON.

JSON Structure:

{
  "careerGoal":"",
  "dreamCompany":"",
  "estimatedReadiness":"",
  "summary":"",
  "strengths":[],
  "missingSkills":[],
  "weeklyPlan":[
    {
      "week":1,
      "topics":[],
      "practicalTasks":[],
      "miniProject":"",
      "resources":[],
      "expectedOutcome":""
    }
  ],
  "recommendedProjects":[],
  "learningResources":[
    {
      "title":"",
      "type":"",
      "url":""
    }
  ],
  "interviewPreparation":{
    "technicalTopics":[],
    "behavioralTopics":[],
    "hrQuestions":[]
  },
  "dailyStudyPlan":[
    {
      "day":"",
      "tasks":[]
    }
  ],
  "motivation":""
}
`;



const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
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

module.exports = {
  generateRoadmapAI
};