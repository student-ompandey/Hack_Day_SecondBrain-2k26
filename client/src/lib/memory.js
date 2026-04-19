import { addDays, format } from 'date-fns';

const STORAGE_KEY = 'second-brain-memories';

export function saveSessionToMemory(data, title = "New Study Session") {
  const existing = getSavedMemories();
  
  const now = new Date();
  const session = {
    id: crypto.randomUUID(),
    title: title,
    createdAt: now.toISOString(),
    dates: {
      review1: addDays(now, 1).toISOString(),
      review2: addDays(now, 7).toISOString(),
      review3: addDays(now, 30).toISOString(),
    },
    data: data 
  };
  
  const updated = [session, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  
  // Dispatch a custom event so the Sidebar can listen and re-render across the window
  window.dispatchEvent(new Event('memory-updated'));
  
  return session;
}

export function getSavedMemories() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse memories", e);
    return [];
  }
}
