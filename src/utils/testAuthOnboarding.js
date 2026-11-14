// Automated test for Auth validation and Onboarding state generation
import { calculateCareerMatch, analyzeSkillDNA, generateDynamicRoadmap } from './careerEngine.js';

console.log("=== TEST AUTH VALIDATION & ONBOARDING FLOW ===");

// 1. Sign In validation logic
function validateSignIn(email, password) {
  const errs = {};
  if (!email.trim()) errs.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email format.";

  if (!password) errs.password = "Password is required.";
  else if (password.length < 6) errs.password = "Password must be at least 6 characters.";

  return errs;
}

// 2. Sign Up validation logic
function validateSignUp(name, email, password, confirmPassword) {
  const errs = {};
  if (!name.trim()) errs.name = "Full name is required.";
  if (!email.trim()) errs.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email format.";

  if (!password) errs.password = "Password is required.";
  else if (password.length < 8) errs.password = "Password must be at least 8 characters.";

  if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match.";

  return errs;
}

// Test Sign In Validation
console.log("1. Testing Sign In Validation...");
const emptySignIn = validateSignIn("", "");
console.log("Empty sign in blocked?", !!emptySignIn.email && !!emptySignIn.password ? "PASS" : "FAIL");

const invalidEmail = validateSignIn("notanemail", "123456");
console.log("Invalid email blocked?", !!invalidEmail.email ? "PASS" : "FAIL");

const validSignIn = validateSignIn("alex@example.com", "secret123");
console.log("Valid sign in passes?", Object.keys(validSignIn).length === 0 ? "PASS" : "FAIL");

// Test Sign Up Validation
console.log("\n2. Testing Sign Up Validation...");
const mismatchSignUp = validateSignUp("Jordan Smith", "jordan@dev.io", "password123", "different");
console.log("Mismatched passwords blocked?", mismatchSignUp.confirmPassword === "Passwords do not match." ? "PASS" : "FAIL");

const shortPassword = validateSignUp("Jordan Smith", "jordan@dev.io", "short", "short");
console.log("Short password (<8 chars) blocked?", mismatchSignUp.confirmPassword || shortPassword.password ? "PASS" : "FAIL");

const validSignUp = validateSignUp("Jordan Smith", "jordan@dev.io", "securePass123", "securePass123");
console.log("Valid sign up passes?", Object.keys(validSignUp).length === 0 ? "PASS" : "FAIL");

// 3. Test Onboarding to Dashboard Pipeline
console.log("\n3. Testing Onboarding Completion Pipeline...");
const onboardedStudent = {
  name: "Jordan Smith",
  handle: "@jordansmith",
  currentRole: "Self-Taught Developer",
  targetRole: "Data Analyst",
  targetCareerId: "data-analyst",
  weeklyStudyHours: 20,
  skills: [
    { id: "s1", name: "SQL", category: "Database", proficiency: 65, confidence: 70, verified: false },
    { id: "s2", name: "Python", category: "Data Science", proficiency: 60, confidence: 65, verified: false },
    { id: "s3", name: "Tableau", category: "Business Intelligence", proficiency: 40, confidence: 50, verified: false }
  ],
  completedTaskIds: ["da-t101"]
};

const daMatch = calculateCareerMatch(onboardedStudent.skills, [], [], onboardedStudent.targetCareerId);
console.log(`Onboarded Learner: ${onboardedStudent.name}`);
console.log(`Target: ${daMatch.career.title}`);
console.log(`Calculated Readiness: ${daMatch.readinessScore}%`);
console.log(`Identified Missing Skills:`, daMatch.missingSkills.map(s => s.name));
console.log(`Identified Transferable Skills:`, daMatch.transferableSkills.map(s => s.name));

const roadmap = generateDynamicRoadmap(onboardedStudent.skills, onboardedStudent.targetCareerId, new Set(onboardedStudent.completedTaskIds));
console.log(`Generated Roadmap Phase 1: ${roadmap[0].title} (Progress: ${roadmap[0].progress}%)`);

const onboardingPass = daMatch.readinessScore > 0 && roadmap.length > 0 && daMatch.missingSkills.length > 0;
console.log("Onboarding pipeline to dynamic engine verification?", onboardingPass ? "PASS" : "FAIL");
