import { addDays } from 'date-fns';

const API_URL = `${import.meta.env.VITE_API_URL || 'https://hack-day-secondbrain-2k26-3.onrender.com'}/api/memories`;

export async function saveSessionToMemory(data, title = "New Study Session") {
  const now = new Date();
  
  const payload = {
    title,
    data,
    dates: {
      review1: addDays(now, 1).toISOString(),
      review2: addDays(now, 7).toISOString(),
      review3: addDays(now, 30).toISOString(),
    }
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) throw new Error("Failed to save to database");
    
    // Dispatch a custom event so the Sidebar can listen and re-fetch asynchronously
    window.dispatchEvent(new Event('memory-updated'));
    
    return await res.json();
  } catch (err) {
    console.error("Database save error:", err);
    throw err;
  }
}

export async function getSavedMemories() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch memories");
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch memories from MongoDB", e);
    return [];
  }
}
