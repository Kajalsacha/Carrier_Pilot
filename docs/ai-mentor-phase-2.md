# AI Mentor — Phase 2: Context-Aware Career Mentor

## 1. What this feature does

Before this change, the AI Mentor chat page was essentially a broken, generic
chatbot — every message either failed silently or (once fixed) would have
behaved like a plain ChatGPT wrapper with no memory of who the user is.

Phase 2 turns it into a **context-aware mentor**: before every question is
sent to the LLM, the backend automatically collects real data already stored
in the app (the user's roadmap, target role, dream company, experience level,
and recent conversation history) and builds one structured prompt out of it.
The AI's answers are therefore grounded in the user's actual goals and
progress, not generic advice.

No new database collections, no schema changes, no new architecture layers —
the existing **Controller → Service → MongoDB** flow is reused exactly as it
already worked for every other feature in the app.

---

## 2. The bug this fixed (and why it mattered)

The chat feature was completely non-functional before this change:

```js
// backend/routes/chatRoutes.js
router.post("/", authMiddleware, askQuestion);
```

```js
// backend/controllers/chatController.js (OLD)
const roadmap = await Roadmap.findById(req.params.id); // req.params.id is always undefined
```

The route has no `:id` segment, so `req.params.id` was always `undefined`,
`Roadmap.findById(undefined)` always returned `null`, and every single chat
request 404'd with `"Roadmap not found"`. On top of that, the frontend
(`chatService.js`) was sending `{ message }` while the backend expected
`{ roadmapId, question }` — the two sides never matched.

Rather than patch around this, Phase 2 fixes the actual root cause as part of
rebuilding the flow.

---

## 3. Execution flow

```
User types a question OR clicks a Quick Action button
        │
        ▼
handleSend(message)  — frontend, unchanged
        │
        ▼
POST /api/chat  { message }
        │
        ▼
chatController.askQuestion
   1. Find the user's most recent Roadmap
      → Roadmap.findOne({ user }).sort({ createdAt: -1 })
      → if none exists: return 400 "Generate a roadmap first..."
   2. Fetch the last 5 Chat documents for that user + roadmap
      → Chat.find({ user, roadmap }).sort({ createdAt: -1 }).limit(5)
        (reversed back to oldest-first before building the prompt)
        │
        ▼
chatService.askCareerMentor(roadmap, recentChats, message)
   - Builds ONE plain-text prompt (see §4)
   - Sends it to Groq (llama-3.1-8b-instant — same fast model used before)
        │
        ▼
   Save the new Chat document (question + answer)
        │
        ▼
   Respond  { reply: answer }
        │
        ▼
Frontend appends the AI message to the chat — same code path as before
```

---

## 4. What context is collected, and where it comes from

| Context field         | Source                                                              |
|------------------------|----------------------------------------------------------------------|
| Target Role            | `Roadmap.targetRole`                                                |
| Dream Company           | `Roadmap.dreamCompany`                                              |
| Experience              | `Roadmap.experience`                                                |
| Candidate Background    | `Roadmap.roadmap.candidateSummary` (see note below)                 |
| Current Roadmap Week    | `Roadmap.roadmap.roadmap[0]` — the first week (see note below)      |
| Recent Chat History     | Last 5 `Chat` documents for this user + this roadmap                |
| Current Question        | Whatever the user typed, or the Quick Action's predefined prompt    |

**Example of the actual prompt sent to Groq:**

```
You are CareerPilot AI Mentor, a friendly and knowledgeable career guide.

User Information
Target Role: Backend Developer
Dream Company: Google
Experience: Beginner

Candidate Background:
As a beginner with skills in React, Node, and MongoDB, you have a solid
foundation to become a Backend Developer at Google...

Current Roadmap:
Week 1 - Introduction to Backend Engineering
Understand the basics of backend development...

Recent Chat History:
Q: Explain JWT Authentication.
A: I'm thrilled to help you learn about JWT Authentication!...

User Question:
Can you give me one practice exercise for what you just explained?

Instructions:
- Use the information above to give personalized, relevant advice.
- Keep the tone encouraging and beginner-friendly.
- Keep the answer clear and concise.
- If the question relates to the current roadmap week, connect your answer to it.
- If the question is unrelated to the roadmap, just answer it directly.
```

### Two honest design notes (worth remembering for interviews)

1. **"Current Skills" isn't a stored field.** The `Roadmap` schema never
   persisted the skills the user typed in when generating the roadmap — they
   were only used as an input to the AI prompt at generation time. Rather
   than adding a new field (explicitly out of scope — no schema changes
   allowed), this reuses `candidateSummary`, an AI-written paragraph that
   already naturally references the user's skills and strengths in prose.
   It serves the same purpose without touching the database.

2. **"Current Week" defaults to week 1.** The schema has no progress-tracking
   field (no "which weeks are completed" concept exists anywhere in the app —
   this was confirmed earlier while building the Roadmap Progress page too).
   Rather than inventing fake progress data, the mentor always references the
   first week as a reasonable, honest stand-in for "where the user currently
   is." This can be upgraded later if real progress tracking is added.

---

## 5. Why "latest roadmap" instead of a roadmap picker

The `Chat` model requires a `roadmap` reference (`required: true`), so every
chat message must be tied to one roadmap. Instead of asking the frontend to
track and send a `roadmapId` (which would need new state, a picker UI, and
more complexity for very little benefit — most users only have one active
roadmap at a time), the backend just looks up the user's most recently
created roadmap automatically. This keeps the frontend contract identical to
what it already was (`sendMessage(message)` → `{ reply }`), and needed **zero
frontend service-layer changes**.

If the user has no roadmap yet, the backend returns a clear `400`:
`"Generate a roadmap first so your AI Mentor can give personalized guidance."`
— which the frontend already displays via its existing toast-on-error
pattern.

---

## 6. Files changed (4 total — 1 new, 3 modified)

| File | Change |
|---|---|
| `backend/services/chatService.js` | Rewrote `askCareerMentor` to build the structured prompt above (target role, company, experience, candidate background, current week, recent chat history) instead of just dumping the whole raw roadmap JSON into the prompt. |
| `backend/controllers/chatController.js` | Fixed `askQuestion`: finds the latest roadmap instead of using the broken `req.params.id`, fetches recent chat history, calls the updated service, saves the chat, responds `{ reply }`. `getChatHistory` was left completely untouched. |
| `frontend/src/components/chat/QuickActions.jsx` **(new)** | Five buttons (Review Resume, Interview Questions, Roadmap Help, Improve ATS Score, Career Advice), each just calling the same existing `handleSend` with a predefined prompt — no new API calls, no new state. |
| `frontend/src/pages/Chat/MentorChat.jsx` | Renders `<QuickActions>` above the existing chat card; improved the error toast to show the backend's real message (e.g. the "generate a roadmap first" message) instead of a generic one — matching the error-handling pattern already used elsewhere in the app. |

**Not touched:** `chatRoutes.js` (the route shape was already correct — only
the controller body had the bug), `frontend/src/services/chatService.js`,
`ChatMessages.jsx`, `ChatInput.jsx`, `MessageBubble.jsx`, all Mongoose models,
and every other controller/route in the app.

---

## 7. API contract

**Request**
```
POST /api/chat
Authorization: Bearer <token>

{ "message": "Explain JWT Authentication." }
```

**Response — success**
```json
{ "reply": "I'm thrilled to help you learn about JWT Authentication!..." }
```

**Response — no roadmap yet**
```
400 Bad Request
{ "message": "Generate a roadmap first so your AI Mentor can give personalized guidance." }
```

---

## 8. How this was verified

This was tested end-to-end against the real running backend and a real Groq
account — not mocked:

1. Called `/api/chat` with no roadmap → confirmed the `400` message.
2. Generated a real roadmap ("Backend Developer" / "Google") via the existing
   roadmap-generation endpoint.
3. Asked *"Explain JWT Authentication."* → the reply explicitly said *"...our
   current focus for Week 1 of your roadmap!"* — proof the roadmap context
   was actually used, not just present in the prompt unused.
4. Asked a follow-up, *"Can you give me one practice exercise for what you
   just explained?"* — a question that never mentions JWT on its own — and
   got back an answer specifically about a JWT practice exercise, proving
   the recent chat history is genuinely feeding into context.
5. Confirmed both exchanges were persisted correctly via the existing
   (untouched) `getChatHistory` endpoint.
6. Clicked the "Career Advice" Quick Action in the real browser UI — the
   reply referenced "becoming a backend developer at Google," again proving
   real context usage from the UI, not just via direct API calls.
7. Zero console errors throughout.

---

## 9. Possible future improvements (not part of this phase)

- Real progress tracking (which weeks are actually completed) would let
  "Current Roadmap Week" point at the user's real current week instead of
  always week 1.
- A short AI-generated summary of chat history (instead of raw Q&A pairs)
  would scale better if history grows very long — not necessary yet since
  only the last 5 exchanges are used.
- Letting users explicitly pick which roadmap to discuss, if they ever have
  more than one active at a time.
