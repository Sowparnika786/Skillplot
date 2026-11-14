import assert from 'assert';
import { getPipDialogue, PERSONALITIES } from './pipDialogue.js';

console.log("==================================================================");
console.log("PIP MASCOT AI COMPANION AUTOMATED TEST SUITE");
console.log("==================================================================");

// -----------------------------------------------------------------------------
// 1. Personalities Registry
// -----------------------------------------------------------------------------
console.log("\n[TEST 1] Validating 4 Personalities...");
assert.ok(PERSONALITIES.genz, "Must include Gen Z Bestie");
assert.ok(PERSONALITIES.wholesome, "Must include Wholesome Coach");
assert.ok(PERSONALITIES.gamer, "Must include Gamer Companion");
assert.ok(PERSONALITIES.professional, "Must include Executive Mentor");
assert.strictEqual(Object.keys(PERSONALITIES).length, 4);
console.log("✓ PASS: 4 personalities registered with emojis and tags.");

// -----------------------------------------------------------------------------
// 2. Demo Scenario: Alex scores 35% on JavaScript Diagnostic
// -----------------------------------------------------------------------------
console.log("\n[TEST 2] Testing Demo Scenario: Alex scores 35% in JavaScript Diagnostic...");
const alexLowJsResult = {
  quizTitle: "JavaScript Core & Asynchronous Runtime Diagnostic",
  score: 35,
  band: "remediation",
  weakTopics: ["Event Loop & Microtasks", "Promises & Async Concurrency"]
};

const pipGenzReaction = getPipDialogue({
  personality: "genz",
  view: "assessments",
  studentData: { name: "Alex Rivera", targetRole: "Full Stack Developer" },
  latestAssessment: alexLowJsResult
});

console.log(`PIP State: ${pipGenzReaction.state}`);
console.log(`PIP Headline: "${pipGenzReaction.headline}"`);
console.log(`PIP Body: "${pipGenzReaction.body}"`);

// Verify exact demo quote requirement
assert.strictEqual(pipGenzReaction.state, "encouraging", "Low score should trigger encouraging state");
assert.ok(
  pipGenzReaction.headline.includes("Bestie, JavaScript really chose violence today 💀 But your comeback arc starts NOW! Let's fix those async concepts together. 🔥"),
  "PIP Gen Z must output the exact demo quote for JavaScript low score"
);
assert.ok(
  pipGenzReaction.body.includes("Event Loop & Microtasks") || pipGenzReaction.body.includes("Promises & Async Concurrency"),
  "PIP must reference real weak topics identified by Assessment Agent"
);
assert.ok(
  pipGenzReaction.body.includes("Phase 1 of your roadmap"),
  "PIP must mention actionable revision in Phase 1"
);
assert.strictEqual(pipGenzReaction.actionTarget, "roadmap", "Action CTA should target roadmap");
console.log("✓ PASS: Demo scenario matches requirements exactly.");

// -----------------------------------------------------------------------------
// 3. Testing Remaining Personalities on 35% Score
// -----------------------------------------------------------------------------
console.log("\n[TEST 3] Testing Wholesome, Gamer, and Professional on 35% Score...");
const wholesomeReaction = getPipDialogue({
  personality: "wholesome",
  studentData: { name: "Alex Rivera" },
  latestAssessment: alexLowJsResult
});
assert.strictEqual(wholesomeReaction.state, "encouraging");
assert.ok(wholesomeReaction.headline.includes("Take a deep breath"));
assert.ok(wholesomeReaction.body.includes("Event Loop & Microtasks"));

const gamerReaction = getPipDialogue({
  personality: "gamer",
  studentData: { name: "Alex Rivera" },
  latestAssessment: alexLowJsResult
});
assert.strictEqual(gamerReaction.state, "thinking");
assert.ok(gamerReaction.headline.includes("WIPEOUT! Boss fight failed"));
assert.ok(gamerReaction.body.includes("Respawning with +2 beginner revision labs"));

const proReaction = getPipDialogue({
  personality: "professional",
  studentData: { name: "Alex Rivera" },
  latestAssessment: alexLowJsResult
});
assert.strictEqual(proReaction.state, "encouraging");
assert.ok(proReaction.headline.includes("Diagnostic Variance Detected: 35%"));
assert.ok(proReaction.body.includes("Assessment Evaluator identified gaps in Event Loop & Microtasks"));
console.log("✓ PASS: All 4 personalities handle low score with unique tone & real weak topics.");

// -----------------------------------------------------------------------------
// 4. Testing Celebrated Verified Improvement (≥80%)
// -----------------------------------------------------------------------------
console.log("\n[TEST 4] Testing Celebrated Verified Improvement (85% on JS)...");
const passedJsResult = {
  quizTitle: "JavaScript Core Diagnostic",
  score: 85,
  band: "passed",
  weakTopics: []
};

const pipPassedReaction = getPipDialogue({
  personality: "genz",
  studentData: { name: "Alex Rivera" },
  latestAssessment: passedJsResult
});
assert.strictEqual(pipPassedReaction.state, "celebrating", "Score >= 80% must trigger celebrating state");
assert.ok(pipPassedReaction.headline.includes("Ate and left ZERO crumbs! 💅"));
assert.ok(pipPassedReaction.body.includes("next roadmap phase is officially unlocked"));
console.log("✓ PASS: Verified pass triggers celebrating state and unlocked milestone feedback.");

// -----------------------------------------------------------------------------
// 5. Testing View Transitions & Context-Aware Guidance
// -----------------------------------------------------------------------------
console.log("\n[TEST 5] Testing View Transitions (Landing, Onboarding, Skill DNA, Roadmap)...");
// Landing
const landingDialogue = getPipDialogue({ personality: "genz", view: "landing" });
assert.strictEqual(landingDialogue.state, "waving");
assert.ok(landingDialogue.headline.includes("Hiii! I'm PIP"));

// Onboarding Step 2
const onboardingDialogue = getPipDialogue({ personality: "genz", view: "onboarding", onboardingStep: 2 });
assert.strictEqual(onboardingDialogue.state, "thinking");
assert.ok(onboardingDialogue.headline.includes("Step 2: Real talk—drop your actual skills!"));

// Skill DNA
const dnaDialogue = getPipDialogue({
  personality: "genz",
  activeModule: "skill-dna",
  careerMatch: { readinessScore: 40, missingSkills: [{ name: "React" }] }
});
assert.strictEqual(dnaDialogue.state, "thinking");
assert.ok(dnaDialogue.headline.includes("Clocked your Skill DNA matrix! 40%"));

// Roadmap
const roadmapDialogue = getPipDialogue({ personality: "genz", activeModule: "roadmap" });
assert.strictEqual(roadmapDialogue.state, "happy");
assert.ok(roadmapDialogue.headline.includes("This roadmap is alive, bestie!"));

console.log("✓ PASS: Contextual guidance verified across all application modules.");

console.log("\n==================================================================");
console.log("ALL PIP MASCOT TESTS PASSED SUCCESSFULLY!");
console.log("==================================================================");
