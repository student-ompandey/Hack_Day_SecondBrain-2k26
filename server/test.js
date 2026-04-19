import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyB7AvsN2bCPvVUqaZhOz2n1PNuBqUJrlgk");

async function run() {
  const modelsToTest = [
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-1.0-pro"
  ];
  
  for (const m of modelsToTest) {
    try {
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("hi");
      console.log(`SUCCESS: ${m}`);
      return;
    } catch (e) {
      console.log(`FAILED: ${m} -> ${e.message.split('\n')[0]}`);
    }
  }
}

run();
