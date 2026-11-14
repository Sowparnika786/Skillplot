import assert from 'assert';
import { SMART_ASSESSMENTS } from '../data/assessmentData.js';
import { 
  processAssessmentResult, 
  getMotivationalFeedback, 
  calculateCareerMatch, 
  analyzeSkillDNA, 
  generateDynamicRoadmap 
} from './careerEngine.js';
import { DEFAULT_INITIAL_STATE } from './storage.js';

console.log("==================================================================");
console.log("SMART ASSESSMENTS & ADAPTIVE LEARNING AUTOMATED TEST SUITE");
console.log("==================================================================");

// -----------------------------------------------------------------------------
// 1. Validate SMART_ASSESSMENTS Data Structure
// -----------------------------------------------------------------------------
console.log("\n[TEST 1] Validating 4 Five-Question MCQ Assessments...");
assert.strictEqual(SMART_ASSESSMENTS.length, 4, "Should have 4 diagnostic assessments");
const quizIds = SMART_ASSESSMENTS.map(q => q.id);
assert.ok(quizIds.includes("quiz-js"), "Must include JS diagnostic");
assert.ok(quizIds.includes("quiz-react"), "Must include React diagnostic");
assert.ok(quizIds.includes("quiz-python"), "Must include Python diagnostic");
assert.ok(quizIds.includes("quiz-sql"), "Must include SQL diagnostic");

SMART_ASSESSMENTS.forEach(quiz => {
  assert.strictEqual(quiz.questions.length, 5, `${quiz.title} must have exactly 5 questions`);
  quiz.questions.forEach((q, idx) => {
    assert.ok(q.question, `Question ${idx + 1} must have a prompt`);
    assert.strictEqual(q.options.length, 4, `Question ${idx + 1} must have 4 options`);
    assert.ok(typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < 4, `Question ${idx + 1} valid correctIndex`);
    assert.ok(q.topicTag, `Question ${idx + 1} must have a topicTag`);
    assert.ok(q.explanation, `Question ${idx + 1} must have an explanation`);
  });
});
console.log("✓ PASS: 4 diagnostic quizzes verified with exactly 5 questions, topic tags & explanations.");

// -----------------------------------------------------------------------------
// 2. Real Answer Grading & < 50% Remediation Band (including 35% dev fixture)
// -----------------------------------------------------------------------------
console.log("\n[TEST 2] Testing Answer Grading & < 50% Remediation Band (35% & 40%)...");
const jsQuiz = SMART_ASSESSMENTS.find(q => q.id === "quiz-js");

// User answers only 2 correct (40%)
const answers40 = {
  0: 1, // correct
  1: 1, // incorrect (correct is 0)
  2: 1, // correct
  3: 0, // incorrect (correct is 1)
  4: 0  // incorrect (correct is 1)
};

let correctCount = 0;
jsQuiz.questions.forEach((q, idx) => {
  if (answers40[idx] === q.correctIndex) correctCount++;
});
const score40 = Math.round((correctCount / jsQuiz.questions.length) * 100);
assert.strictEqual(score40, 40, "Real grading calculation must yield 40%");

const result40 = processAssessmentResult(jsQuiz, score40, answers40);
assert.strictEqual(result40.feedback.band, "remediation", "Score 40% must be remediation band");
assert.ok(result40.weakTopics.length > 0, "Must extract weak topics from missed questions");
assert.ok(result40.weakTopics.includes("Closures & Scope"), "Should detect Closures & Scope as weak topic");
assert.strictEqual(result40.adaptiveTasks.length, 2, "Must generate 2 beginner adaptive tasks");
assert.ok(result40.adaptiveTasks.some(t => t.title.includes("Beginner Revision Lesson")), "Must contain Beginner Revision Lesson");
assert.ok(result40.adaptiveTasks.some(t => t.title.includes("Remedial Practice Lab")), "Must contain Remedial Practice Lab");
console.log("✓ PASS: 40% real answers graded correctly -> remediation tasks injected.");

// Test 35% developer fixture
const result35 = processAssessmentResult(
  jsQuiz, 
  35, 
  {}, 
  ["Event Loop & Microtasks", "Promises & Async Concurrency"]
);
assert.strictEqual(result35.score, 35, "Fixture score should be 35%");
assert.strictEqual(result35.feedback.band, "remediation");
assert.ok(result35.feedback.headline.includes("Foundational Revision Added"));
assert.ok(result35.feedback.message.includes("Score: 35%"));
assert.strictEqual(result35.adaptiveTasks.length, 2);
assert.ok(result35.adaptiveTasks[0].title.includes("Event Loop & Microtasks"));
console.log("✓ PASS: Developer fixture 35% score triggers exact remediation band with supportive feedback.");

// -----------------------------------------------------------------------------
// 3. Testing 50% to 79% Practice Band (60%)
// -----------------------------------------------------------------------------
console.log("\n[TEST 3] Testing 50% - 79% Targeted Practice Band (60%)...");
// 3 out of 5 correct = 60%
const answers60 = { 0: 1, 1: 0, 2: 1, 3: 0, 4: 0 };
let correctCount60 = 0;
jsQuiz.questions.forEach((q, idx) => {
  if (answers60[idx] === q.correctIndex) correctCount60++;
});
const score60 = Math.round((correctCount60 / jsQuiz.questions.length) * 100);
assert.strictEqual(score60, 60);

const result60 = processAssessmentResult(jsQuiz, score60, answers60);
assert.strictEqual(result60.feedback.band, "reinforcement");
assert.ok(result60.feedback.headline.includes("Targeted Practice Exercises Added"));
assert.strictEqual(result60.adaptiveTasks.length, 2);
assert.ok(result60.adaptiveTasks.some(t => t.title.includes("Targeted Practice")));
assert.ok(result60.adaptiveTasks.some(t => t.title.includes("Reassessment Challenge")));
console.log("✓ PASS: 60% score triggers targeted practice band & reassessment challenge.");

// -----------------------------------------------------------------------------
// 4. Testing >= 80% Passing Band & Verified State Elevation
// -----------------------------------------------------------------------------
console.log("\n[TEST 4] Testing >= 80% Passing Band, Credential Verification & Phase Unlock...");
const answers100 = { 0: 1, 1: 0, 2: 1, 3: 1, 4: 1 };
let correctCount100 = 0;
jsQuiz.questions.forEach((q, idx) => {
  if (answers100[idx] === q.correctIndex) correctCount100++;
});
const score100 = Math.round((correctCount100 / jsQuiz.questions.length) * 100);
assert.strictEqual(score100, 100);

const result100 = processAssessmentResult(jsQuiz, score100, answers100);
assert.strictEqual(result100.feedback.band, "passed");
assert.ok(result100.feedback.headline.includes("Verified Mastery: Next Module Unlocked!"));
assert.strictEqual(result100.weakTopics.length, 0, "100% has zero weak topics");

// Check Career Engine impact: Alex Rivera baseline (missing JS)
let learnerSkills = [...DEFAULT_INITIAL_STATE.skills];
const preMatch = calculateCareerMatch(learnerSkills, [], [], "fullstack");
console.log(`Pre-assessment Career Readiness: ${preMatch.readinessScore}%`);
assert.ok(preMatch.missingSkills.some(s => s.name.includes("JavaScript")), "JS must be missing initially");

// Elevate skill from passing assessment
learnerSkills.push({
  id: "javascript",
  name: "JavaScript",
  category: "Frontend",
  proficiency: 85,
  confidence: 90,
  verified: true
});

const postMatch = calculateCareerMatch(learnerSkills, [{ ...jsQuiz, completed: true, score: 85 }], [], "fullstack");
console.log(`Post-assessment Career Readiness: ${postMatch.readinessScore}% (increased from ${preMatch.readinessScore}%)`);
assert.ok(postMatch.readinessScore > preMatch.readinessScore, "Readiness score must increase after passing assessment");
assert.ok(!postMatch.missingSkills.some(s => s.name.includes("JavaScript")), "JS must no longer be missing");

// Check Roadmap Phase 2 unlock
const roadmapWithUnlock = generateDynamicRoadmap(
  learnerSkills, 
  "fullstack", 
  new Set(["fs-t101"]), 
  [], 
  new Set(["fs-phase-2"])
);
const phase2 = roadmapWithUnlock.find(p => p.phase === 2);
assert.ok(phase2.status.includes("Active") || phase2.status.includes("Unlocked") || phase2.status === "Mastered", "Phase 2 must be unlocked");
console.log("✓ PASS: Passing assessment verifies skill, increases readiness score, and unlocks Phase 2.");

// -----------------------------------------------------------------------------
// 5. Preserving Unrelated Completed Tasks
// -----------------------------------------------------------------------------
console.log("\n[TEST 5] Verifying Completed Tasks Preservation...");
const completedTaskIds = new Set(["fs-t101", "fs-t102"]);
const roadmapWithAdaptive = generateDynamicRoadmap(
  learnerSkills,
  "fullstack",
  completedTaskIds,
  result35.adaptiveTasks,
  new Set()
);

const phase1Tasks = roadmapWithAdaptive[0].tasks;
// Adaptive tasks are prepended
assert.ok(phase1Tasks[0].isAdaptive, "First task must be adaptive task");
// Check completed status
const t101 = phase1Tasks.find(t => t.id === "fs-t101");
const t102 = phase1Tasks.find(t => t.id === "fs-t102");
const t103 = phase1Tasks.find(t => t.id === "fs-t103");
assert.strictEqual(t101.completed, true, "fs-t101 must remain completed");
assert.strictEqual(t102.completed, true, "fs-t102 must remain completed");
assert.strictEqual(t103.completed, false, "fs-t103 must remain uncompleted");
console.log("✓ PASS: Unrelated completed tasks strictly preserved when adaptive tasks are injected.");

// -----------------------------------------------------------------------------
// 6. Career Switching & Transferable Skills
// -----------------------------------------------------------------------------
console.log("\n[TEST 6] Testing Career Switching to Data Analyst...");
const daMatch = calculateCareerMatch(learnerSkills, [{ ...jsQuiz, completed: true, score: 85 }], [], "data-analyst");
assert.strictEqual(daMatch.career.id, "data-analyst");
assert.ok(daMatch.transferableSkills.length > 0, "Must identify transferable skills");
assert.ok(daMatch.strengths.some(s => s.name.includes("Python")), "Python must be a strength for Data Analyst (85% vs 75% req)");
assert.ok(daMatch.weaknesses.some(s => s.name.includes("SQL")), "SQL is a weakness for Data Analyst (72% vs 85% req)");

// If Alex takes SQL diagnostic and scores 90%, SQL elevates to strength
learnerSkills = learnerSkills.map(s => s.id === "sql" ? { ...s, proficiency: 90, verified: true } : s);
const daMatchElevated = calculateCareerMatch(learnerSkills, [{ ...jsQuiz, completed: true, score: 85 }], [], "data-analyst");
assert.ok(daMatchElevated.strengths.some(s => s.name.includes("SQL")), "Elevated SQL (90%) must now be a strength for Data Analyst");

const daRoadmap = generateDynamicRoadmap(
  learnerSkills,
  "data-analyst",
  new Set(["da-t101"]),
  result35.adaptiveTasks,
  new Set(["da-phase-2"])
);
assert.strictEqual(daRoadmap[0].id, "da-phase-1");
console.log("✓ PASS: Switching career recalculates gaps, keeps transferable skills and adaptive tasks.");

console.log("\n==================================================================");
console.log("ALL SMART ASSESSMENTS & ADAPTIVE TESTS PASSED SUCCESSFULLY!");
console.log("==================================================================");
