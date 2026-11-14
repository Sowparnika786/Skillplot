// Test script verifying test scenario logic
import { 
  CAREER_REQUIREMENTS, 
  calculateCareerMatch, 
  analyzeSkillDNA, 
  generateDynamicRoadmap 
} from './careerEngine.js';

console.log("=== TEST SCENARIO 1: Alex Rivera baseline (Full Stack Developer) ===");
let skills = [
  { id: "python", name: "Python", category: "Backend / Scripting", proficiency: 85, confidence: 90, verified: true },
  { id: "sql", name: "SQL (PostgreSQL)", category: "Database", proficiency: 72, confidence: 78, verified: true },
  { id: "html", name: "Basic HTML", category: "Frontend", proficiency: 45, confidence: 55, verified: false }
];

let matchFS = calculateCareerMatch(skills, [], [], "fullstack");
console.log(`Career: ${matchFS.career.title}`);
console.log(`Readiness Score: ${matchFS.readinessScore}%`);
console.log("Missing Skills:", matchFS.missingSkills.map(s => s.name));
console.log("Strengths:", matchFS.strengths.map(s => s.name));
console.log("Weaknesses:", matchFS.weaknesses.map(s => s.name));

const missingNames = matchFS.missingSkills.map(s => s.name);
const hasJS = missingNames.some(n => n.includes("JavaScript"));
const hasReact = missingNames.some(n => n.includes("React"));
const hasNode = missingNames.some(n => n.includes("Node"));
console.log(`Verification: JS, React, Node missing? ${hasJS && hasReact && hasNode ? "PASS" : "FAIL"}`);

console.log("\n=== TEST SCENARIO 2: Add JavaScript to skills ===");
skills.push({
  id: "skill-js",
  name: "JavaScript",
  category: "Frontend",
  proficiency: 65,
  confidence: 70,
  verified: false
});

let matchFS_updated = calculateCareerMatch(skills, [], [], "fullstack");
console.log(`Updated Readiness Score: ${matchFS_updated.readinessScore}% (was ${matchFS.readinessScore}%)`);
console.log("Updated Missing Skills:", matchFS_updated.missingSkills.map(s => s.name));
const jsStillMissing = matchFS_updated.missingSkills.some(s => s.name.includes("JavaScript"));
console.log(`Verification: JavaScript removed from missing skills? ${!jsStillMissing ? "PASS" : "FAIL"}`);
console.log(`Verification: Readiness score increased? ${matchFS_updated.readinessScore > matchFS.readinessScore ? "PASS" : "FAIL"}`);

let roadmapFS = generateDynamicRoadmap(skills, "fullstack", new Set());
console.log("Roadmap Phase 1 Focus:", roadmapFS[0].focusSkill);
console.log("Roadmap Phase 2 Focus:", roadmapFS[1].focusSkill);

console.log("\n=== TEST SCENARIO 3: Switch Career to Data Analyst ===");
let matchDA = calculateCareerMatch(skills, [], [], "data-analyst");
console.log(`Career: ${matchDA.career.title}`);
console.log(`Readiness Score for Data Analyst: ${matchDA.readinessScore}%`);
console.log("Data Analyst Missing Skills:", matchDA.missingSkills.map(s => s.name));
console.log("Data Analyst Strengths:", matchDA.strengths.map(s => s.name));
console.log("Data Analyst Transferable Skills:", matchDA.transferableSkills.map(s => `${s.name} (${s.proficiency}%)`));

const hasDatavizMissing = matchDA.missingSkills.some(s => s.name.includes("Visualization"));
const pythonSQLPreserved = matchDA.transferableSkills.some(s => s.name.includes("Python")) && 
                          matchDA.transferableSkills.some(s => s.name.includes("SQL"));
console.log(`Verification: Data Analyst skill gaps updated? ${hasDatavizMissing ? "PASS" : "FAIL"}`);
console.log(`Verification: Transferable skills preserved (Python & SQL)? ${pythonSQLPreserved ? "PASS" : "FAIL"}`);

let roadmapDA = generateDynamicRoadmap(skills, "data-analyst", new Set());
console.log("Data Analyst Roadmap Phases:", roadmapDA.map(p => `${p.title} [Focus: ${p.focusSkill}]`));
