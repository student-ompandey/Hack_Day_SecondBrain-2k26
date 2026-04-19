import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import mongoose from 'mongoose';
import Memory from './models/Memory.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup Multer for Memory Storage
const upload = multer({ storage: multer.memoryStorage() });

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB cluster connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

app.post('/analyze', upload.single('file'), async (req, res) => {
  try {
    const { content, explainLevel } = req.body;
    const file = req.file;

    if (!content && !file) {
      return res.status(400).json({ error: 'Content or file is required.' });
    }

    const levelGuide = {
      'Beginner': 'Explain core concepts in very simple, easy-to-understand language. Use basic analogies and avoid complex jargon.',
      'Intermediate': 'Provide moderate detail, introducing standard terminology with concise explanations.',
      'Expert': 'Provide a highly technical, deep-dive academic explanation assuming strong prior field knowledge.'
    };
    
    const explanationStyle = levelGuide[explainLevel || 'Intermediate'];

    // Determine the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            summary: {
              type: SchemaType.ARRAY,
              description: "A 3-bullet point summary.",
              items: { type: SchemaType.STRING },
            },
            keyConcepts: {
              type: SchemaType.ARRAY,
              description: "An array of 5 important terms and their definitions.",
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  term: { type: SchemaType.STRING },
                  definition: { type: SchemaType.STRING },
                },
                required: ["term", "definition"]
              }
            },
            quiz: {
              type: SchemaType.ARRAY,
              description: "An array of 3 Multiple Choice Questions.",
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  question: { type: SchemaType.STRING },
                  options: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING },
                  },
                  correctAnswer: { type: SchemaType.STRING }
                },
                required: ["question", "options", "correctAnswer"]
              }
            },
            mindmap: {
              type: SchemaType.ARRAY,
              description: "A hierarchical mindmap flowchart representation of the core topics.",
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  node: { type: SchemaType.STRING, description: "The main overarching topic module." },
                  children: {
                    type: SchemaType.ARRAY,
                    description: "Sub-topics or specific granular details falling under the parent node.",
                    items: { type: SchemaType.STRING }
                  }
                },
                required: ["node", "children"]
              }
            }
          },
          required: ["summary", "keyConcepts", "quiz", "mindmap"]
        }
      }
    });

    const promptText = `Analyze the following user notes/content and extract a 3-bullet point summary, 5 key concepts with definitions, and a 3-question multiple-choice quiz about the content.
    
    CRITICAL INSTRUCTION FOR EXPLANATION STYLE: 
    ${explanationStyle}
    
    Content:\n${content || "No extra text context provided, strictly analyze the given file."}`;

    const promptParts = [promptText];

    // If a file is uploaded, convert to inline representation!
    if (file) {
      promptParts.push({
        inlineData: {
          data: file.buffer.toString('base64'),
          mimeType: file.mimetype
        }
      });
    }

    const result = await model.generateContent(promptParts);
    const responseText = result.response.text();
    
    // Parse the JSON representation
    const jsonOutput = JSON.parse(responseText);

    res.status(200).json(jsonOutput);
  } catch (error) {
    console.error('Error analyzing content:', error);
    res.status(500).json({ error: 'Failed to securely process with AI.' });
  }
});

// GET all memories
app.get('/api/memories', async (req, res) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.status(200).json(memories);
  } catch (error) {
    console.error('Fetch memory error:', error);
    res.status(500).json({ error: 'Database fetch failed' });
  }
});

// POST a new memory (Session)
app.post('/api/memories', async (req, res) => {
  try {
    const { title, data, dates } = req.body;
    const newMemory = new Memory({ title, data, dates });
    await newMemory.save();
    res.status(201).json(newMemory);
  } catch (error) {
    console.error('Save memory error:', error);
    res.status(500).json({ error: 'Failed to persist payload to MongoDB' });
  }
});

// POST Analyze Quiz Diagnostics
app.post('/analyze-quiz', async (req, res) => {
  try {
    const { incorrectQuestions } = req.body;
    
    if (!incorrectQuestions || incorrectQuestions.length === 0) {
      return res.status(200).json({ 
        weakTopics: ["None detected! Outstanding retention."], 
        revisionPlan: "You have mastered this dataset. Push your next review back to 30 days." 
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            weakTopics: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "Identify 1 to 3 specific core concepts the user failed to grasp."
            },
            revisionPlan: {
              type: SchemaType.STRING,
              description: "A short, actionable strategy (1, 3, 7 days) to drill these specific weaknesses."
            }
          },
          required: ["weakTopics", "revisionPlan"]
        }
      }
    });

    const promptText = `Analyze these incorrect quiz questions to determine the user's weak spots:\n\n${JSON.stringify(incorrectQuestions, null, 2)}`;
    const result = await model.generateContent(promptText);
    const jsonOutput = JSON.parse(result.response.text());

    res.status(200).json(jsonOutput);
  } catch (error) {
    console.error('Quiz analysis error:', error);
    res.status(500).json({ error: 'Failed to generate diagnostic report' });
  }
});

// POST Ask Doubt Chat
app.post('/ask-doubt', async (req, res) => {
  try {
    const { messages, context } = req.body;
    
    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: 'Message history is required' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const formattedHistory = messages.slice(0, -1).map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n');
    const currentQuestion = messages[messages.length - 1].content;

    const promptText = `You are an expert study assistant bridging the gap between raw data and true student understanding.
    
--- CONTEXT SOURCE ---
${JSON.stringify(context, null, 2)}

--- PREVIOUS CONVERSATION ---
${formattedHistory}

Current User Message: ${currentQuestion}

Answer the user directly and concisely based on the context and conversation history. Maintain the flow of conversation.`;

    const result = await model.generateContent(promptText);
    const responseText = result.response.text();

    res.status(200).json({ answer: responseText });
  } catch (error) {
    console.error('Ask doubt error:', error);
    res.status(500).json({ error: 'Failed to process doubt' });
  }
});

// POST Learning DNA
app.post('/learning-dna', async (req, res) => {
  try {
    const { activityData } = req.body;
    
    if (!activityData) {
      return res.status(400).json({ error: 'Activity data is required' });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            learningStyle: { type: SchemaType.STRING, description: "e.g., Visual, Theoretical, Practical" },
            strengths: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, description: "2-3 strings identifying their strengths" },
            weaknesses: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING }, description: "2-3 strings identifying weaknesses" },
            focusPattern: { type: SchemaType.STRING, description: "Short sentence about their attention/focus based on the data" },
            strategy: { type: SchemaType.STRING, description: "Actionable 1-paragraph piece of coaching advice" }
          },
          required: ["learningStyle", "strengths", "weaknesses", "focusPattern", "strategy"]
        }
      }
    });

    const promptText = `Analyze this student's behavior during a recent study session and generate a personalized Learning DNA profile.
    
--- ACTIVITY DATA ---
${JSON.stringify(activityData, null, 2)}

Identify their overall learning style, strengths, weaknesses, focus pattern (based on what they got wrong or asked about), and provide a core study strategy.`;

    const result = await model.generateContent(promptText);
    const jsonOutput = JSON.parse(result.response.text());

    res.status(200).json(jsonOutput);
  } catch (error) {
    console.error('Learning DNA error:', error);
    res.status(500).json({ error: 'Failed to generate DNA profile' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('/(.*)', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`SecondBrain Backend initialized and running on port ${PORT}`);
});
