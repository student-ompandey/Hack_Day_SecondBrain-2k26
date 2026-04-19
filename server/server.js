import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup Multer for Memory Storage
const upload = multer({ storage: multer.memoryStorage() });

const PORT = process.env.PORT || 5000;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

app.post('/analyze', upload.single('file'), async (req, res) => {
  try {
    const { content } = req.body;
    const file = req.file;

    if (!content && !file) {
      return res.status(400).json({ error: 'Content or file is required.' });
    }

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
            }
          },
          required: ["summary", "keyConcepts", "quiz"]
        }
      }
    });

    const promptText = `Analyze the following user notes/content and extract a 3-bullet point summary, 5 key concepts with definitions, and a 3-question multiple-choice quiz about the content.\n\nContent:\n${content || "No extra text context provided, strictly analyze the given file."}`;

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

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`SecondBrain Backend initialized and running on port ${PORT}`);
});
