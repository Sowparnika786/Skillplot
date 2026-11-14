// ==========================================================================
// SKILLPILOT AI — LocalStorage Persistence Manager
// ==========================================================================

import { initialStudentData } from '../data/mockData.js';

const STORAGE_KEY = "skillpilot_learner_state_v2";

export const DEFAULT_INITIAL_STATE = {
  ...initialStudentData,
  targetCareerId: "fullstack",
  // Initial skills matching user test scenario: Python, SQL, Basic HTML
  skills: [
    { id: "python", name: "Python", category: "Backend / Scripting", proficiency: 85, confidence: 90, verified: true },
    { id: "sql", name: "SQL (PostgreSQL)", category: "Database", proficiency: 72, confidence: 78, verified: true },
    { id: "html", name: "Basic HTML", category: "Frontend", proficiency: 45, confidence: 55, verified: false }
  ],
  completedTaskIds: ["fs-t101"],
  assessmentHistory: [],
  adaptiveTasks: [],
  adaptiveLog: [],
  unlockedPhaseIds: []
};

export function loadStudentState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_INITIAL_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_INITIAL_STATE,
      ...parsed,
      skills: parsed.skills || DEFAULT_INITIAL_STATE.skills,
      completedTaskIds: parsed.completedTaskIds || DEFAULT_INITIAL_STATE.completedTaskIds,
      assessmentHistory: parsed.assessmentHistory || [],
      adaptiveTasks: parsed.adaptiveTasks || [],
      adaptiveLog: parsed.adaptiveLog || [],
      unlockedPhaseIds: parsed.unlockedPhaseIds || []
    };
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    return DEFAULT_INITIAL_STATE;
  }
}

export function saveStudentState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
}

export function resetStudentState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_INITIAL_STATE;
  } catch (err) {
    return DEFAULT_INITIAL_STATE;
  }
}
