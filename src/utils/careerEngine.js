// ==========================================================================
// SKILLPILOT AI — Pure Career Intelligence, Skill Analysis & Adaptive Engine
// ==========================================================================

export const CAREER_REQUIREMENTS = {
  "fullstack": {
    id: "fullstack",
    title: "Full Stack Developer",
    category: "Software Engineering",
    description: "Build client-facing interactive web applications and robust server APIs, connecting modern frontends with relational databases.",
    difficulty: "Balanced",
    estimatedWeeks: "16–20 Weeks",
    coreFrameworks: ["React 19", "JavaScript (ES6+)", "Node.js", "Express", "PostgreSQL", "HTML5/CSS3", "Git"],
    requiredSkills: [
      { id: "javascript", name: "JavaScript (ES6+)", category: "Frontend", minProficiency: 80, weight: 3, description: "Async/await, DOM APIs, event loop, closures, modern ES features" },
      { id: "react", name: "React Ecosystem", category: "Frontend", minProficiency: 80, weight: 3, description: "Component state, hooks (useState, useEffect), reconciliation, composition" },
      { id: "nodejs", name: "Node.js & Express", category: "Backend", minProficiency: 75, weight: 3, description: "REST API routing, middleware, asynchronous I/O, server lifecycle" },
      { id: "python", name: "Python", category: "Backend / Scripting", minProficiency: 70, weight: 2, description: "Backend scripting, server-side data wrangling, automation" },
      { id: "sql", name: "SQL & Databases", category: "Database", minProficiency: 70, weight: 2, description: "Relational queries, schema joins, indexes, ACID transactions" },
      { id: "html", name: "HTML5 & Web Semantics", category: "Frontend", minProficiency: 65, weight: 2, description: "Semantic markup, document object model, accessibility standards" },
      { id: "css", name: "Modern CSS", category: "Frontend", minProficiency: 60, weight: 1, description: "Flexbox, CSS grid, responsive layout techniques, variables" },
      { id: "git", name: "Git & Version Control", category: "DevOps", minProficiency: 65, weight: 1, description: "Branching, merge conflict resolution, pull request collaboration" }
    ]
  },
  "data-analyst": {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data & Business Intelligence",
    description: "Transform complex operational and transactional datasets into business intelligence dashboards, statistical metrics, and executive insights.",
    difficulty: "Direct",
    estimatedWeeks: "10–14 Weeks",
    coreFrameworks: ["SQL (PostgreSQL)", "Python (Pandas)", "Tableau / PowerBI", "Statistical Analysis", "Excel Modeling"],
    requiredSkills: [
      { id: "sql", name: "SQL & Analytical Querying", category: "Database", minProficiency: 85, weight: 3, description: "Window functions, recursive CTEs, cohort analysis, aggregation performance" },
      { id: "python", name: "Python (Pandas & NumPy)", category: "Data Science", minProficiency: 75, weight: 3, description: "Data wrangling, cleansing, exploratory data analysis (EDA), dataframes" },
      { id: "dataviz", name: "Data Visualization & BI", category: "Business Intelligence", minProficiency: 75, weight: 3, description: "Interactive dashboards, chart design, Tableau/PowerBI, stakeholder reporting" },
      { id: "statistics", name: "Statistics & Probability", category: "Mathematics", minProficiency: 70, weight: 2, description: "A/B testing, hypothesis testing, distributions, significance modeling" },
      { id: "excel", name: "Advanced Excel Modeling", category: "Analytics Tooling", minProficiency: 70, weight: 2, description: "Pivot tables, complex lookups, financial summaries, scenario modeling" },
      { id: "git", name: "Git & Documentation", category: "DevOps", minProficiency: 55, weight: 1, description: "Reproducible notebooks, versioned analysis repositories" }
    ]
  },
  "ai-ml": {
    id: "ai-ml",
    title: "AI/ML Engineer",
    category: "Artificial Intelligence",
    description: "Design and implement production machine learning pipelines, fine-tune models, and integrate agentic/LLM orchestration into scalable APIs.",
    difficulty: "Advanced",
    estimatedWeeks: "22–26 Weeks",
    coreFrameworks: ["Python", "PyTorch", "Scikit-Learn", "Vector Databases", "FastAPI", "Transformers", "SQL"],
    requiredSkills: [
      { id: "python", name: "Python & Numerical Computing", category: "AI / Computing", minProficiency: 85, weight: 3, description: "High-performance Python, NumPy vectorization, OOP architectures" },
      { id: "ml-core", name: "Machine Learning (Scikit-Learn)", category: "Machine Learning", minProficiency: 80, weight: 3, description: "Supervised/unsupervised algorithms, cross-validation, feature engineering" },
      { id: "deep-learning", name: "Deep Learning & PyTorch", category: "Deep Learning", minProficiency: 75, weight: 3, description: "Neural network architectures, backpropagation, model fine-tuning" },
      { id: "math-linear-algebra", name: "Linear Algebra & Calculus", category: "Mathematics", minProficiency: 75, weight: 2, description: "Matrix decomposition, gradients, optimization functions" },
      { id: "sql", name: "SQL & Vector Databases", category: "Database", minProficiency: 70, weight: 2, description: "Relational data extraction, vector embedding indexes (Pinecone, Chroma)" },
      { id: "model-deployment", name: "Model Deployment & APIs", category: "Engineering", minProficiency: 70, weight: 2, description: "FastAPI endpoints, streaming inferences, Docker containerization" },
      { id: "git", name: "Git & MLOps", category: "DevOps", minProficiency: 65, weight: 1, description: "Model experiment tracking, version control for datasets & weights" }
    ]
  }
};

/**
 * Normalizes skill naming for fuzzy matching.
 */
export function normalizeSkillId(name = "") {
  const clean = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (clean.includes("python")) return "python";
  if (clean.includes("sql") || clean.includes("postgres")) return "sql";
  if (clean.includes("javascript") || clean.includes("es6") || clean === "js") return "javascript";
  if (clean.includes("react")) return "react";
  if (clean.includes("node") || clean.includes("express")) return "nodejs";
  if (clean.includes("html")) return "html";
  if (clean.includes("css") || clean.includes("flexbox") || clean.includes("tailwind")) return "css";
  if (clean.includes("git")) return "git";
  if (clean.includes("viz") || clean.includes("tableau") || clean.includes("powerbi")) return "dataviz";
  if (clean.includes("stat") || clean.includes("probab")) return "statistics";
  if (clean.includes("excel") || clean.includes("spread")) return "excel";
  if (clean.includes("deep") || clean.includes("pytorch") || clean.includes("tensor")) return "deep-learning";
  if (clean.includes("machine") || clean.includes("ml") || clean.includes("scikit")) return "ml-core";
  if (clean.includes("algebra") || clean.includes("calculus") || clean.includes("math")) return "math-linear-algebra";
  if (clean.includes("deploy") || clean.includes("fastapi") || clean.includes("docker")) return "model-deployment";
  return clean;
}

/**
 * Checks whether a skill is verified by an assessment or project evidence.
 */
export function isSkillVerified(skill, assessments = [], projects = []) {
  if (skill.verified) return true;

  const normalized = normalizeSkillId(skill.name);

  // Check if assessment completed with passing score (>= 80% passing standard)
  const passedQuiz = assessments.some(q => {
    if (!q.completed || q.score === null || q.score < 80) return false;
    const quizNorm = normalizeSkillId((q.skillId || "") + " " + q.title + " " + q.category);
    return quizNorm.includes(normalized) || normalized.includes(normalizeSkillId(q.skillId || ""));
  });
  if (passedQuiz) return true;

  // Check if verified project utilizes this skill
  const inVerifiedProject = projects.some(p => {
    if (p.verifiedScore < 80) return false;
    return (p.tech || []).some(t => normalizeSkillId(t) === normalized);
  });
  if (inVerifiedProject) return true;

  return false;
}

/**
 * Analyzes career match, skill gaps, readiness score, and categorizes skills:
 * - Strengths
 * - Weaknesses
 * - Missing Skills
 * - Transferable Skills
 */
export function calculateCareerMatch(skills = [], assessments = [], projects = [], careerId = "fullstack") {
  const career = CAREER_REQUIREMENTS[careerId] || CAREER_REQUIREMENTS["fullstack"];
  const userSkillMap = new Map();

  skills.forEach(s => {
    const norm = normalizeSkillId(s.name);
    const verified = isSkillVerified(s, assessments, projects);
    userSkillMap.set(norm, {
      ...s,
      normalizedId: norm,
      isVerified: verified,
      effectiveProficiency: s.proficiency || 0,
      confidence: s.confidence || s.proficiency || 50
    });
  });

  const strengths = [];
  const weaknesses = [];
  const missingSkills = [];
  const requiredMatches = [];

  let totalWeight = 0;
  let earnedWeightedScore = 0;

  career.requiredSkills.forEach(req => {
    totalWeight += req.weight;
    const normReqId = normalizeSkillId(req.id || req.name);
    const userSkill = userSkillMap.get(normReqId);

    if (!userSkill) {
      missingSkills.push({
        ...req,
        status: "Missing Skill",
        userProficiency: 0,
        gapPercentage: req.minProficiency
      });
      requiredMatches.push({
        ...req,
        userProficiency: 0,
        isVerified: false,
        status: "Missing",
        gap: req.minProficiency
      });
    } else {
      // Unverified self-reported skills receive discounted confidence factor (0.75x)
      const verificationFactor = userSkill.isVerified ? 1.0 : 0.75;
      const effectiveScore = Math.min(100, userSkill.effectiveProficiency * verificationFactor);

      // Contribution to career readiness
      const skillScoreRatio = Math.min(1.0, effectiveScore / req.minProficiency);
      earnedWeightedScore += skillScoreRatio * req.weight;

      const gap = Math.max(0, req.minProficiency - userSkill.effectiveProficiency);

      const matchItem = {
        ...req,
        userProficiency: userSkill.effectiveProficiency,
        userConfidence: userSkill.confidence,
        isVerified: userSkill.isVerified,
        gap: gap
      };

      if (userSkill.effectiveProficiency >= req.minProficiency) {
        strengths.push({
          ...matchItem,
          status: "Strength"
        });
        matchItem.status = "Strength";
      } else {
        weaknesses.push({
          ...matchItem,
          status: "Weakness"
        });
        matchItem.status = "Weakness";
      }

      requiredMatches.push(matchItem);
    }
  });

  // Calculate final weighted readiness score (0-100)
  const rawReadiness = totalWeight > 0 ? (earnedWeightedScore / totalWeight) * 100 : 0;
  const readinessScore = Math.round(rawReadiness);

  // Identify transferable skills
  const transferableSkills = [];
  skills.forEach(s => {
    const norm = normalizeSkillId(s.name);
    const isRequired = career.requiredSkills.some(r => normalizeSkillId(r.id || r.name) === norm);
    
    if (s.proficiency >= 60) {
      transferableSkills.push({
        ...s,
        isDirectlyRequired: isRequired,
        transferReason: getTransferReason(norm, careerId)
      });
    }
  });

  return {
    career,
    readinessScore,
    totalRequirementsCount: career.requiredSkills.length,
    strengths,
    weaknesses,
    missingSkills,
    transferableSkills,
    requiredMatches
  };
}

function getTransferReason(normSkillId, targetCareerId) {
  if (normSkillId === "python") {
    if (targetCareerId === "fullstack") return "Translates into async JavaScript & backend microservices logic.";
    if (targetCareerId === "data-analyst") return "Primary tool for automated Pandas transformations and statistical workflows.";
    if (targetCareerId === "ai-ml") return "Core standard runtime for PyTorch, model pipelines, and NumPy math.";
  }
  if (normSkillId === "sql") {
    if (targetCareerId === "fullstack") return "Differentiator for relational schemas, database indexing, and ORM query performance.";
    if (targetCareerId === "data-analyst") return "Essential core for analytical dashboards, CTEs, and cohort reporting.";
    if (targetCareerId === "ai-ml") return "Critical for feature store queries, tabular datasets, and vector DB metadata filters.";
  }
  if (normSkillId === "git") {
    return "Universal version control required across software, data, and ML production environments.";
  }
  if (normSkillId === "html" || normSkillId === "css") {
    if (targetCareerId === "data-analyst") return "Powers custom embedded dashboard widgets and web report styling.";
    return "Foundation for DOM rendering and client visual structure.";
  }
  return "Proven technical capability providing baseline algorithmic leverage.";
}

/**
 * Skill DNA Confidence-vs-Assessment Gap Detector:
 */
export function analyzeSkillDNA(skills = [], assessments = [], projects = [], careerId = "fullstack") {
  const matchResult = calculateCareerMatch(skills, assessments, projects, careerId);

  const quadrants = {
    calibratedStrength: [],
    overconfidenceRisk: [],
    imposterSyndrome: [],
    growthZone: []
  };

  const dnaCompetencies = matchResult.requiredMatches.map(item => {
    const prof = item.userProficiency || 0;
    const conf = item.userConfidence || 0;
    const isVerified = item.isVerified || false;

    let quadrant = "Growth Zone";
    let statusLabel = "Emerging";
    let quadrantColor = "#8B5CF6";

    if (prof >= 70 && conf >= 70) {
      quadrant = "Calibrated Strength";
      statusLabel = "Validated Superpower";
      quadrantColor = "#10B981";
      quadrants.calibratedStrength.push(item);
    } else if (conf >= 65 && (prof < 60 || !isVerified)) {
      quadrant = "Overconfidence Risk";
      statusLabel = "Verification Gap";
      quadrantColor = "#F59E0B";
      quadrants.overconfidenceRisk.push(item);
    } else if (prof >= 70 && conf < 65) {
      quadrant = "Imposter Syndrome";
      statusLabel = "Underestimated Skill";
      quadrantColor = "#38BDF8";
      quadrants.imposterSyndrome.push(item);
    } else {
      quadrant = "Growth Zone";
      statusLabel = "Active Learning Area";
      quadrantColor = "#FB7185";
      quadrants.growthZone.push(item);
    }

    return {
      ...item,
      proficiency: prof,
      confidence: conf,
      quadrant,
      statusLabel,
      quadrantColor
    };
  });

  const insights = [];

  if (quadrants.overconfidenceRisk.length > 0) {
    const topRisk = quadrants.overconfidenceRisk[0];
    insights.push({
      type: "Risk",
      title: `Verification Gap: ${topRisk.name}`,
      text: `Your self-rated confidence (${topRisk.userConfidence}%) exceeds verified assessment scores. Take the diagnostic assessment to validate this skill for your passport.`
    });
  }

  if (matchResult.transferableSkills.length > 0) {
    const topTransfer = matchResult.transferableSkills[0];
    insights.push({
      type: "Superpower",
      title: `${topTransfer.name} Transfer Advantage`,
      text: topTransfer.transferReason
    });
  }

  if (matchResult.missingSkills.length > 0) {
    const topMissing = matchResult.missingSkills[0];
    insights.push({
      type: "Bridge",
      title: `Critical Missing Skill: ${topMissing.name}`,
      text: `Weighted importance of ${topMissing.weight}/3 for ${matchResult.career.title}. Prioritizing this will provide the highest immediate gain in career readiness.`
    });
  }

  return {
    career: matchResult.career,
    readinessScore: matchResult.readinessScore,
    dnaCompetencies,
    quadrants,
    insights,
    strengthsCount: matchResult.strengths.length,
    weaknessesCount: matchResult.weaknesses.length,
    missingCount: matchResult.missingSkills.length,
    transferableCount: matchResult.transferableSkills.length
  };
}

/**
 * Supportive Motivational Feedback generator based on score bands.
 */
export function getMotivationalFeedback(score, quizTitle, weakTopics = []) {
  const topicsStr = weakTopics.length > 0 ? weakTopics.slice(0, 2).join(' and ') : 'these concepts';

  if (score < 50) {
    return {
      band: "remediation",
      status: "Needs Remediation (< 50%)",
      color: "#FB7185",
      headline: "Growth Opportunity: Foundational Revision Added",
      message: `Score: ${score}%. Tripped on ${topicsStr}. Finding knowledge gaps early is exactly how elite engineers master systems. We've automatically added beginner revision lessons to your roadmap to build core mental models from first principles. Keep your head high—failure is just diagnostic data.`
    };
  } else if (score < 80) {
    return {
      band: "reinforcement",
      status: "Developing & Needs Practice (50% – 79%)",
      color: "#F59E0B",
      headline: "Solid Baseline: Targeted Practice Exercises Added",
      message: `Score: ${score}%. Good foundation! You understand the broad strokes, but need sharpening on ${topicsStr}. We've injected targeted coding practice exercises into your roadmap so you can reinforce these edge cases before your next attempt.`
    };
  } else {
    return {
      band: "passed",
      status: "Verified & Passed (≥ 80%)",
      color: "#10B981",
      headline: "Verified Mastery: Next Module Unlocked!",
      message: `Score: ${score}%. Outstanding performance! You demonstrated rigorous competence across ${quizTitle}. This skill is now officially marked as Verified in your Skill DNA, and the next roadmap phase has been unlocked!`
    };
  }
}

/**
 * Processes actual quiz answers, calculates score, determines weak topics,
 * and generates adaptive roadmap changes.
 */
export function processAssessmentResult(quiz, score, selectedAnswers = {}, weakTopicsOverride = null) {
  // If weakTopicsOverride is provided (e.g. from developer demo fixtures), use it;
  // otherwise, derive weak topics from missed questions
  let weakTopics = [];
  if (weakTopicsOverride && Array.isArray(weakTopicsOverride)) {
    weakTopics = weakTopicsOverride;
  } else {
    (quiz.questions || []).forEach((q, idx) => {
      if (selectedAnswers[idx] !== q.correctIndex && q.topicTag) {
        if (!weakTopics.includes(q.topicTag)) {
          weakTopics.push(q.topicTag);
        }
      }
    });
  }

  const feedback = getMotivationalFeedback(score, quiz.title, weakTopics);

  // Generate adaptive tasks to inject into roadmap
  const adaptiveTasks = [];
  if (feedback.band === "remediation") {
    // Below 50%: Beginner revision lessons and remedial practice
    const topic1 = weakTopics[0] || "Core Fundamentals";
    const topic2 = weakTopics[1] || "Mental Models";
    adaptiveTasks.push({
      id: `adapt-rem-${quiz.skillId || 'gen'}-${Date.now()}-1`,
      title: `Beginner Revision Lesson: ${topic1} First Principles`,
      points: 40,
      isAdaptive: true,
      adaptiveType: "Beginner Revision",
      targetQuizId: quiz.id
    });
    adaptiveTasks.push({
      id: `adapt-rem-${quiz.skillId || 'gen'}-${Date.now()}-2`,
      title: `Remedial Practice Lab: ${topic2} Interactive Sandbox`,
      points: 50,
      isAdaptive: true,
      adaptiveType: "Remedial Practice",
      targetQuizId: quiz.id
    });
  } else if (feedback.band === "reinforcement") {
    // 50% to 79%: Targeted practice and reassessment
    const topic1 = weakTopics[0] || "Edge Cases";
    adaptiveTasks.push({
      id: `adapt-reinf-${quiz.skillId || 'gen'}-${Date.now()}-1`,
      title: `Targeted Practice: ${topic1} Drill & Code Review`,
      points: 60,
      isAdaptive: true,
      adaptiveType: "Targeted Practice",
      targetQuizId: quiz.id
    });
    adaptiveTasks.push({
      id: `adapt-reinf-${quiz.skillId || 'gen'}-${Date.now()}-2`,
      title: `Reassessment Challenge: ${quiz.title}`,
      points: 75,
      isAdaptive: true,
      adaptiveType: "Reassessment",
      targetQuizId: quiz.id
    });
  }

  const adaptiveLogEntry = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    quizId: quiz.id,
    quizTitle: quiz.title,
    skillId: quiz.skillId,
    score: score,
    band: feedback.band,
    bandStatus: feedback.status,
    headline: feedback.headline,
    message: feedback.message,
    weakTopics: weakTopics,
    tasksAdded: adaptiveTasks.map(t => t.title),
    unlockedPhase: feedback.band === "passed" ? "Next Learning Phase" : null
  };

  return {
    score,
    feedback,
    weakTopics,
    adaptiveTasks,
    adaptiveLogEntry
  };
}

/**
 * Dynamically generates structured learning roadmaps based on the user's actual missing skills and weaknesses
 * for their chosen career goal, with injected adaptive tasks and phase unlock states.
 */
export function generateDynamicRoadmap(
  skills = [], 
  targetCareerId = "fullstack", 
  completedTaskIds = new Set(),
  adaptiveTasks = [],
  unlockedPhaseIds = new Set()
) {
  const userSkillMap = new Map();
  skills.forEach(s => userSkillMap.set(normalizeSkillId(s.name), s));

  let phases = [];

  if (targetCareerId === "fullstack") {
    const hasJS = (userSkillMap.get("javascript")?.proficiency || 0) >= 80;
    const hasReact = (userSkillMap.get("react")?.proficiency || 0) >= 80;
    const hasNode = (userSkillMap.get("nodejs")?.proficiency || 0) >= 75;

    // Phase 2 unlocked if JS passed or explicitly unlocked
    const phase2Unlocked = hasJS || unlockedPhaseIds.has("fs-phase-2");
    const phase3Unlocked = (hasJS && hasReact) || unlockedPhaseIds.has("fs-phase-3");

    phases = [
      {
        id: "fs-phase-1",
        phase: 1,
        title: "Phase 1: Modern JavaScript & Asynchronous Foundations",
        duration: "Weeks 1–4",
        status: hasJS ? "Mastered" : "Active Sprint",
        focusSkill: "JavaScript (ES6+)",
        tasks: [
          { id: "fs-t101", title: "ES6+ Syntax: Destructuring, Spread, Arrow Functions", points: 50 },
          { id: "fs-t102", title: "Modern DOM Manipulation & Browser Event Delegation", points: 50 },
          { id: "fs-t103", title: "Asynchronous JS: Event Loop, Microtasks & Promises", points: 75 },
          { id: "fs-t104", title: "Fetch API & Consuming Public RESTful Services", points: 60 },
          { id: "fs-t105", title: "Mini Project: Real-time Currency & Stock Ticker", points: 100 }
        ],
        resources: [
          { id: "r1", title: "JavaScript: The Hard Parts & Event Loop Deep Dive", type: "Video Masterclass", duration: "4.5 hrs", rating: 4.9 },
          { id: "r2", title: "Modern JavaScript for Python Developers Guide", type: "Interactive Guide", duration: "2 hrs read", rating: 4.8 }
        ]
      },
      {
        id: "fs-phase-2",
        phase: 2,
        title: "Phase 2: React 19 Ecosystem & Component Architecture",
        duration: "Weeks 5–9",
        status: hasReact ? "Mastered" : phase2Unlocked ? "Unlocked & Active" : "Locked (Pass JS Diagnostic)",
        focusSkill: "React Ecosystem",
        tasks: [
          { id: "fs-t201", title: "JSX Syntax, Component Composition & Props Hierarchy", points: 50 },
          { id: "fs-t202", title: "Hooks Deep Dive: useState, useEffect, useMemo, useRef", points: 80 },
          { id: "fs-t203", title: "Context API & Modern Lightweight Global State (Zustand)", points: 70 },
          { id: "fs-t204", title: "Capstone: AI Prompt Engineering Studio Web Application", points: 150 }
        ],
        resources: [
          { id: "r3", title: "React 19 Component Thinking from First Principles", type: "Interactive Course", duration: "10 hrs", rating: 4.9 }
        ]
      },
      {
        id: "fs-phase-3",
        phase: 3,
        title: "Phase 3: Node.js, Express & RESTful Microservices",
        duration: "Weeks 10–14",
        status: hasNode ? "Mastered" : phase3Unlocked ? "Unlocked" : "Locked",
        focusSkill: "Node.js & Express",
        tasks: [
          { id: "fs-t301", title: "Node.js Core Modules, CommonJS vs ES Modules", points: 50 },
          { id: "fs-t302", title: "Express Server Routing, Middleware & Error Handlers", points: 70 },
          { id: "fs-t303", title: "Connecting PostgreSQL with Prisma ORM / Knex", points: 80 },
          { id: "fs-t304", title: "Authentication: JWT tokens, Bcrypt Password Hashing", points: 90 }
        ],
        resources: [
          { id: "r4", title: "Production Backend Engineering with Node & PostgreSQL", type: "Workshop", duration: "8 hrs", rating: 4.9 }
        ]
      },
      {
        id: "fs-phase-4",
        phase: 4,
        title: "Phase 4: Full Stack Integration, Cloud Deploy & Portfolio",
        duration: "Weeks 15–18",
        status: "Upcoming",
        focusSkill: "End-to-End System",
        tasks: [
          { id: "fs-t401", title: "Monorepo Integration: Connecting React Frontend to Node API", points: 75 },
          { id: "fs-t402", title: "Containerizing Application with Docker & Docker Compose", points: 80 },
          { id: "fs-t403", title: "Production Cloud Deployment on Railway / AWS ECS", points: 100 }
        ],
        resources: [
          { id: "r5", title: "Full Stack System Design & Interview Blueprint", type: "Career Guide", duration: "6 hrs", rating: 5.0 }
        ]
      }
    ];
  } else if (targetCareerId === "data-analyst") {
    const hasDataviz = (userSkillMap.get("dataviz")?.proficiency || 0) >= 75;
    const hasStats = (userSkillMap.get("statistics")?.proficiency || 0) >= 70;
    const hasSQL = (userSkillMap.get("sql")?.proficiency || 0) >= 80;

    const phase2Unlocked = hasSQL || unlockedPhaseIds.has("da-phase-2");

    phases = [
      {
        id: "da-phase-1",
        phase: 1,
        title: "Phase 1: Advanced SQL & Analytical Query Optimization",
        duration: "Weeks 1–3",
        status: hasSQL ? "Mastered & Verified" : "Active Sprint",
        focusSkill: "SQL Analytical Querying",
        tasks: [
          { id: "da-t101", title: "Window Functions: ROW_NUMBER, RANK, NTILE, LAG/LEAD", points: 60 },
          { id: "da-t102", title: "Cohort Retention & Churn Analysis with Recursive CTEs", points: 80 },
          { id: "da-t103", title: "Query Execution Plans (EXPLAIN ANALYZE) & Index Tuning", points: 70 }
        ],
        resources: [
          { id: "da-r1", title: "Advanced PostgreSQL Analytics Masterclass", type: "Hands-on Lab", duration: "5 hrs", rating: 4.9 }
        ]
      },
      {
        id: "da-phase-2",
        phase: 2,
        title: "Phase 2: Business Intelligence & Tableau / PowerBI Dashboards",
        duration: "Weeks 4–7",
        status: hasDataviz ? "Mastered" : phase2Unlocked ? "Unlocked & Active" : "Locked (Pass SQL Diagnostic)",
        focusSkill: "Data Visualization & BI",
        tasks: [
          { id: "da-t201", title: "Executive Dashboard Design Principles & Color Theory", points: 50 },
          { id: "da-t202", title: "Building Interactive Drill-down Reports in Tableau", points: 80 },
          { id: "da-t203", title: "Connecting Live PostgreSQL Feeds to Cloud BI Services", points: 75 }
        ],
        resources: [
          { id: "da-r2", title: "Modern BI Storytelling for Decision Makers", type: "Case Studies", duration: "6 hrs", rating: 4.8 }
        ]
      },
      {
        id: "da-phase-3",
        phase: 3,
        title: "Phase 3: Applied Statistics, A/B Testing & Modeling",
        duration: "Weeks 8–11",
        status: hasStats ? "Mastered" : "Upcoming",
        focusSkill: "Statistics & Probability",
        tasks: [
          { id: "da-t301", title: "Hypothesis Testing, P-values & Confidence Intervals", points: 70 },
          { id: "da-t302", title: "Designing Sample-sized A/B Experiments for Product Metrics", points: 80 },
          { id: "da-t303", title: "Capstone: E-Commerce Funnel Optimization & Strategy Brief", points: 150 }
        ],
        resources: [
          { id: "da-r3", title: "Practical Statistics for Product Analysts", type: "Book & Lab", duration: "8 hrs", rating: 4.9 }
        ]
      }
    ];
  } else if (targetCareerId === "ai-ml") {
    const hasML = (userSkillMap.get("ml-core")?.proficiency || 0) >= 80;
    const hasDL = (userSkillMap.get("deep-learning")?.proficiency || 0) >= 75;

    phases = [
      {
        id: "ml-phase-1",
        phase: 1,
        title: "Phase 1: Classical Machine Learning & Feature Engineering",
        duration: "Weeks 1–6",
        status: hasML ? "Mastered" : "Active Sprint",
        focusSkill: "Machine Learning (Scikit-Learn)",
        tasks: [
          { id: "ml-t101", title: "Supervised Models: Ensembles, Random Forests & XGBoost", points: 70 },
          { id: "ml-t102", title: "Feature Preprocessing: Encoding, Scaling & PCA", points: 60 },
          { id: "ml-t103", title: "Model Validation: K-Fold Cross Validation, ROC-AUC Metrics", points: 70 },
          { id: "ml-t104", title: "Project: Predictive Customer Lifetime Value Regressor", points: 120 }
        ],
        resources: [
          { id: "ml-r1", title: "Applied Machine Learning with Scikit-Learn", type: "Comprehensive Course", duration: "12 hrs", rating: 4.9 }
        ]
      },
      {
        id: "ml-phase-2",
        phase: 2,
        title: "Phase 2: Deep Learning, PyTorch & Neural Networks",
        duration: "Weeks 7–14",
        status: hasDL ? "Mastered" : "Upcoming",
        focusSkill: "Deep Learning & PyTorch",
        tasks: [
          { id: "ml-t201", title: "Tensors, Autograd & Building Feedforward Networks in PyTorch", points: 80 },
          { id: "ml-t202", title: "Transformers Architecture, Self-Attention & Embeddings", points: 90 },
          { id: "ml-t203", title: "Vector Databases: Ingesting Embeddings into Pinecone/Chroma", points: 85 }
        ],
        resources: [
          { id: "ml-r2", title: "Deep Learning for Coders with PyTorch", type: "Masterclass", duration: "15 hrs", rating: 5.0 }
        ]
      },
      {
        id: "ml-phase-3",
        phase: 3,
        title: "Phase 3: Production MLOps, Model Serving & APIs",
        duration: "Weeks 15–20",
        status: "Upcoming",
        focusSkill: "Model Deployment & APIs",
        tasks: [
          { id: "ml-t301", title: "FastAPI Model Serving with Streaming Async Response", points: 80 },
          { id: "ml-t302", title: "Containerizing PyTorch Inference Pipelines with Docker", points: 90 },
          { id: "ml-t303", title: "Capstone: Production Retrieval-Augmented Generation (RAG) System", points: 200 }
        ],
        resources: [
          { id: "ml-r3", title: "Production MLOps & Model Serving Blueprint", type: "Engineering Guide", duration: "8 hrs", rating: 4.9 }
        ]
      }
    ];
  }

  // Inject adaptive tasks into Phase 1 or appropriate active phase
  if (adaptiveTasks && adaptiveTasks.length > 0 && phases.length > 0) {
    const activePhaseIndex = phases.findIndex(p => p.status === "Active Sprint") !== -1 ? phases.findIndex(p => p.status === "Active Sprint") : 0;
    const existingTaskIds = new Set(phases[activePhaseIndex].tasks.map(t => t.id));
    
    // Prepend newly added adaptive tasks so the learner addresses them first
    const newAdaptiveTasks = adaptiveTasks.filter(at => !existingTaskIds.has(at.id));
    phases[activePhaseIndex].tasks = [...newAdaptiveTasks, ...phases[activePhaseIndex].tasks];
  }

  // Map task completion while strictly preserving completedTaskIds
  return phases.map(phase => {
    const tasksWithState = phase.tasks.map(t => ({
      ...t,
      completed: completedTaskIds.has(t.id)
    }));

    const completedCount = tasksWithState.filter(t => t.completed).length;
    const progress = tasksWithState.length > 0 ? Math.round((completedCount / tasksWithState.length) * 100) : 0;

    return {
      ...phase,
      tasks: tasksWithState,
      progress
    };
  });
}
