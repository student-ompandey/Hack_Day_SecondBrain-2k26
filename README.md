# Atlas.AI / SecondBrain 🧠🔥
_Your Brain, Augmented._

Welcome to **SecondBrain**, a cutting-edge educational intelligence dashboard engineered to eradicate the "forgetting curve." Rather than spending hours organizing rote-memorization flashcards or manually writing notes, simply feed your messy data into the SecondBrain engine and instantly unlock an interactive, Spaced-Repetition-powered learning suite.

---

## ⚡ What Makes This Unique?
Traditional study tools are passive. You read a PDF, highlight a textbook, and promptly forget 70% of the material within 24 hours. SecondBrain is an active, **Gamified Memory Core** built to sustain total recall. 

Here is what sets this architecture apart:

### 1. Multi-Modal Ingestion Engine (Gemini 1.5)
Paste a massive Google Drive thesis PDF or a 2-hour long YouTube university lecture. SecondBrain's backend pipes the data directly through `gemini-1.5-pro`, dynamically extracting the core formulas, logical frameworks, and central summaries in seconds.

### 2. Auto-Generating 3D Flashcards
Tired of Anki? SecondBrain analyzes the semantic density of your document and automatically generates comprehensive Quizlet-style interactive 3D Flashcards. No manual deck creation required. 

### 3. Conceptual Node-Tree Mindmaps
Complex information isn't linear, so why are standard notes? Atlas tracks definitions and connections, plotting them automatically onto a vertical glowing timeline/Mindmap interface so you can visualize relationships organically.

### 4. AI "Learning DNA" Diagnostics
After running through an automated "Knowledge Check" quiz, the AI engine dynamically processes your failure points to map your cognitive **Learning DNA**. It identifies what specific areas you are strong in, what definitions present a weakness, and flags focus patterns for future study.

### 5. Gamified LeetCode Tracker 
Learning requires obsession. Your `/profile` is structured exactly like an RPG. 
- Gain **XP Points** and level up by generating Brain-Scans.
- Maintain your flaming **Daily Streak**.
- Fill out your 90-Day **Activity Heatmap**, displaying your raw consistency exactly like a GitHub or Leetcode contribution matrix!

---

## 💻 Tech Stack
This application leverages a modern, highly responsive architecture wrapped in a premium **"Midnight & Ember"** glassmorphic aesthetic.
- **Frontend Core:** React, Vite, React-Router-Dom.
- **Styling:** TailwindCSS, Custom CSS Mesh Noise Gradients, Lucide Icons.
- **Micro-Interactions & Physics:** Framer Motion. 
- **Backend Infrastructure:** Node.js, Express.
- **Database:** MongoDB Atlas (storing historical memory structures).
- **AI Orchestration:** Google `@google/genai` (Gemini Pro/Flash integration).

---

## 🚀 Getting Started

To spin up the SecondBrain engine on your local machine:

1. **Clone & Install Dependencies**
```bash
git clone https://github.com/your-username/SecondBrain.git
cd SecondBrain

# Install root/client dependencies 
npm install

# Install server/backend dependencies
cd server && npm install
```

2. **Configure Environment Variables**
In the `/server` directory, create a `.env` file containing:
```env
PORT=5000
MONGODB_URI=your_mongodb_cluster_connection_string
GEMINI_API_KEY=your_google_ai_studio_api_key
```

3. **Ignite the Sequence**
You can launch both the frontend and backend sequentially.
```bash
# In the root terminal 
npm run dev 

# In a separate terminal inside /server
npm run dev
```

The application will be hot-hosted on `localhost:5173`. Access the `/` Landing route, sign in, and hit the Dashboard to augment your brain!
