// ==========================================================================
// SKILLPILOT AI — PIP Mascot Dialogue & Personality Engine
// ==========================================================================

export const PERSONALITIES = {
  genz: {
    id: "genz",
    label: "Gen Z Bestie",
    emoji: "💅",
    tagline: "Unfiltered, witty, hyped & supportive"
  },
  wholesome: {
    id: "wholesome",
    label: "Wholesome Coach",
    emoji: "🌱",
    tagline: "Warm, gentle, empathetic & encouraging"
  },
  gamer: {
    id: "gamer",
    label: "Gamer Companion",
    emoji: "🎮",
    tagline: "Quest-driven, XP-focused & high energy"
  },
  professional: {
    id: "professional",
    label: "Executive Mentor",
    emoji: "💼",
    tagline: "Concise, strategic & telemetry-driven"
  }
};

/**
 * Returns dialogue, mood state, and suggested action based on real learner context.
 */
export function getPipDialogue({
  personality = "genz",
  view = "dashboard",
  activeModule = "dashboard",
  studentData = null,
  careerMatch = null,
  latestAssessment = null,
  onboardingStep = 1
}) {
  const p = personality || "genz";
  const studentName = studentData?.name ? studentData.name.split(" ")[0] : "Alex";
  const targetCareer = careerMatch?.career?.title || studentData?.targetRole || "Full Stack Developer";
  const readiness = careerMatch?.readinessScore ?? 30;

  // 1. Assessment Outcome Reaction (Highest Priority)
  if (latestAssessment) {
    const { score, quizTitle, band, weakTopics = [] } = latestAssessment;
    const isJS = (quizTitle || "").toLowerCase().includes("javascript") || (quizTitle || "").toLowerCase().includes("js");
    const topicsStr = weakTopics.length > 0 
      ? weakTopics.slice(0, 2).join(" & ") 
      : (isJS ? "async concepts" : "these core concepts");

    if (score < 50) {
      if (p === "genz") {
        const headline = isJS 
          ? "Bestie, JavaScript really chose violence today 💀 But your comeback arc starts NOW! Let's fix those async concepts together. 🔥"
          : `Oof bestie, that ${quizTitle} test had hands! 💀 But we don't do rage quits here. Your comeback arc starts NOW!`;

        return {
          state: "encouraging",
          headline,
          body: `The Assessment Agent flagged ${topicsStr}. We already injected beginner revision lessons straight into Phase 1 of your roadmap. Let's lock in!`,
          actionLabel: "View Roadmap Revision",
          actionTarget: "roadmap",
          badge: "Comeback Arc Activated"
        };
      } else if (p === "wholesome") {
        return {
          state: "encouraging",
          headline: `Take a deep breath, ${studentName}! Every master was once a beginner who refused to give up. 🌱`,
          body: `Score: ${score}%. It's completely okay—diagnostic tests exist to illuminate growth paths. We've added step-by-step revision on ${topicsStr}. You've got this!`,
          actionLabel: "Open Gentle Lessons",
          actionTarget: "roadmap",
          badge: "Learning Step-by-Step"
        };
      } else if (p === "gamer") {
        return {
          state: "thinking",
          headline: `WIPEOUT! Boss fight failed at ${score}% HP, but you gathered critical telemetry! ⚔️`,
          body: `Weakness detected in ${topicsStr}. Respawning with +2 beginner revision labs in Phase 1. Equip your gear and grind that XP!`,
          actionLabel: "Respawn in Roadmap",
          actionTarget: "roadmap",
          badge: "Respawn Ready"
        };
      } else { // professional
        return {
          state: "encouraging",
          headline: `Diagnostic Variance Detected: ${score}% on ${quizTitle}.`,
          body: `The Assessment Evaluator identified gaps in ${topicsStr}. The Roadmap Planner has automatically queued 2 foundational revision modules into Phase 1 to ensure engineering competency.`,
          actionLabel: "Review Remediation Plan",
          actionTarget: "roadmap",
          badge: "Remediation Queued"
        };
      }
    } else if (score < 80) {
      // 50% - 79% Practice Band
      if (p === "genz") {
        return {
          state: "happy",
          headline: `Okayyy, we see that progress! ${score}% is giving solid foundations fr fr. ✨`,
          body: `You've got the broad strokes down! A quick targeted drill on ${topicsStr} and that diagnostic is getting cooked. Next milestone is calling your name!`,
          actionLabel: "Check Targeted Drills",
          actionTarget: "roadmap",
          badge: "Main Character Energy"
        };
      } else if (p === "wholesome") {
        return {
          state: "happy",
          headline: `Wonderful effort, ${studentName}! You scored ${score}%! 🌿`,
          body: `You are making real progress. With just a little targeted practice on ${topicsStr}, you will achieve full mastery. I'm cheering for you!`,
          actionLabel: "Practice Exercises",
          actionTarget: "roadmap",
          badge: "Steady Growth"
        };
      } else if (p === "gamer") {
        return {
          state: "happy",
          headline: `Level checkpoint reached! ${score}% completion achieved. 🛡️`,
          body: `Solid mid-tier run! Defeating ${topicsStr} edge cases will unlock your S-Rank achievement. Ready up for the reassessment challenge!`,
          actionLabel: "Claim Quest Tasks",
          actionTarget: "roadmap",
          badge: "Checkpoint Passed"
        };
      } else {
        return {
          state: "happy",
          headline: `Developing Competency: ${score}% on ${quizTitle}.`,
          body: `Demonstrated solid baseline. The Roadmap Planner has injected targeted reinforcement drills on ${topicsStr} prior to official passport certification.`,
          actionLabel: "Open Practice Drills",
          actionTarget: "roadmap",
          badge: "Reinforcement Active"
        };
      }
    } else {
      // >= 80% Passed Band
      if (p === "genz") {
        return {
          state: "celebrating",
          headline: `Ate and left ZERO crumbs! 💅 ${score}% verified in the bag! 🎉`,
          body: `No notes! You literally proved mastery on ${quizTitle}. Credential is fully verified in your Skill DNA, and the next roadmap phase is officially unlocked. Elite behavior!`,
          actionLabel: "Explore Unlocked Phase",
          actionTarget: "roadmap",
          badge: "Verified Flex"
        };
      } else if (p === "wholesome") {
        return {
          state: "celebrating",
          headline: `Outstanding achievement, ${studentName}! ${score}% with verified honors! 🌟`,
          body: `Your hard work and dedication truly paid off. This skill is officially verified in your passport, and your next learning adventure is open. So proud of you!`,
          actionLabel: "Celebrate & Continue",
          actionTarget: "roadmap",
          badge: "Verified Master"
        };
      } else if (p === "gamer") {
        return {
          state: "celebrating",
          headline: `S-RANK VICTORY! Critical mastery achieved with ${score}%! 🏆`,
          body: `Boss defeated! Legendary credential unlocked, verification multiplier boosted to 1.0x, and next dungeon phase is now accessible. Level up!`,
          actionLabel: "Advance to Next Level",
          actionTarget: "roadmap",
          badge: "S-Tier Mastery"
        };
      } else {
        return {
          state: "celebrating",
          headline: `Benchmark Certified: ${score}% on ${quizTitle}.`,
          body: `Competency verified at industry standard. Verification multiplier elevated to 1.0x in career engine and next curriculum phase unlocked for acceleration.`,
          actionLabel: "View Verified Roadmap",
          actionTarget: "roadmap",
          badge: "Industry Certified"
        };
      }
    }
  }

  // 2. Landing Page Context
  if (view === "landing") {
    if (p === "genz") {
      return {
        state: "waving",
        headline: "Hiii! I'm PIP, your AI career architect & hype buddy! ✨",
        body: "No gatekeeping here! Test out the live demo dashboard or sign up to turn your current skills into a verified software career roadmap. We don't do static fluff.",
        actionLabel: "Try Live Demo",
        actionTarget: "demo",
        badge: "Your AI Companion"
      };
    } else if (p === "wholesome") {
      return {
        state: "waving",
        headline: "Welcome friend! I'm PIP, your personal learning guide. 🌱",
        body: "Every journey begins with a single step. Whether you're starting fresh or pivoting, I'll be right here to support your career growth.",
        actionLabel: "Explore Demo",
        actionTarget: "demo",
        badge: "Warm Welcome"
      };
    } else if (p === "gamer") {
      return {
        state: "waving",
        headline: "Player 1 detected! Ready to start your tech skill tree? 🎮",
        body: "SkillPilot AI calculates your real career stats and maps your questline to high-tier roles. Jump into Demo Mode to inspect the build!",
        actionLabel: "Start Tutorial (Demo)",
        actionTarget: "demo",
        badge: "New Game"
      };
    } else {
      return {
        state: "waving",
        headline: "Welcome to SkillPilot AI — Architectural Career Intelligence.",
        body: "I am PIP, your telemetry companion. We provide objective diagnostic validation, Skill DNA gap analysis, and dynamic curriculum orchestration.",
        actionLabel: "Launch Live Prototype",
        actionTarget: "demo",
        badge: "System Active"
      };
    }
  }

  // 3. Onboarding Wizard Context
  if (view === "onboarding") {
    if (onboardingStep === 1) {
      return {
        state: "thinking",
        headline: p === "genz" ? "Step 1: Drop your lore! Who are we working with? 📝" : "Step 1: Let's begin with your profile and interests.",
        body: "Don't overthink it—your background helps the agents tailor learning pace and analogies.",
        badge: "Step 1 of 3"
      };
    } else if (onboardingStep === 2) {
      return {
        state: "thinking",
        headline: p === "genz" ? "Step 2: Real talk—drop your actual skills! No cap. 🎯" : "Step 2: Enter your existing technical competencies.",
        body: "Rate your confidence honestly. We use your real skills to detect superpowers and missing gaps.",
        badge: "Step 2 of 3"
      };
    } else {
      return {
        state: "happy",
        headline: p === "genz" ? "Step 3: Target locked! Where are we landing? 🚀" : "Step 3: Select your primary career target.",
        body: `Choose between Full Stack, Data Analyst, or AI/ML. We'll generate your dynamic roadmap the moment you finish!`,
        badge: "Step 3 of 3"
      };
    }
  }

  // 4. View Module Reactions
  if (activeModule === "skill-dna") {
    const riskCount = careerMatch?.overconfidenceRisks?.length || 0;
    const missingCount = careerMatch?.missingSkills?.length || 0;

    if (p === "genz") {
      return {
        state: "thinking",
        headline: `Clocked your Skill DNA matrix! ${readiness}% career readiness so far. 🧬`,
        body: missingCount > 0 
          ? `See those ${missingCount} missing skill chips? That's not a flex against you—it's your roadmap's cheat code. Diagnostic tests will verify them in no time!`
          : `Looking clean! All core competencies mapped. Take diagnostics to lock in those verified badges.`,
        actionLabel: "Take Diagnostic Test",
        actionTarget: "assessments",
        badge: "Skill DNA Telemetry"
      };
    } else if (p === "wholesome") {
      return {
        state: "encouraging",
        headline: `Your Skill DNA is unique and full of potential, ${studentName}! 🌿`,
        body: `Every quadrant shows where you shine and where you can grow. Focus on one milestone at a time, and remember that progress compounds.`,
        actionLabel: "View Diagnostics",
        actionTarget: "assessments",
        badge: "Growth Mindset"
      };
    } else if (p === "gamer") {
      return {
        state: "thinking",
        headline: `Skill Tree Analysis: ${readiness}% progression toward ${targetCareer}! 📊`,
        body: `Identified ${missingCount} locked abilities. Defeating diagnostic assessments will upgrade unverified skills and boost your readiness stat.`,
        actionLabel: "Enter Diagnostic Arena",
        actionTarget: "assessments",
        badge: "Skill Tree Matrix"
      };
    } else {
      return {
        state: "thinking",
        headline: `Competency Matrix Telemetry: ${readiness}% Alignment.`,
        body: `Skills plotted across proficiency and confidence. Unverified self-reported skills operate under a 0.75x discount until validated via assessment proof.`,
        actionLabel: "Run Diagnostics",
        actionTarget: "assessments",
        badge: "Audit Matrix"
      };
    }
  }

  if (activeModule === "roadmap") {
    return {
      state: "happy",
      headline: p === "genz" 
        ? `This roadmap is alive, bestie! No copy-pasting here. 🗺️`
        : `Your curriculum adapts dynamically to your progress and diagnostics.`,
      body: p === "genz"
        ? `Whenever you take an assessment or update skills, the Roadmap Planner re-architects your tasks. Check the Before & After card for recent mutations!`
        : `Milestones are calibrated to target your highest-weighted gaps for ${targetCareer}. Completed tasks are always preserved.`,
      actionLabel: "Take Assessment",
      actionTarget: "assessments",
      badge: "Adaptive Curriculum"
    };
  }

  if (activeModule === "assessments") {
    return {
      state: "waving",
      headline: p === "genz"
        ? `Diagnostic room ready! 5 questions. Real answers. Real grading. 🔥`
        : `Smart Diagnostic Assessments: 5 questions each with instant analysis.`,
      body: p === "genz"
        ? `Score < 50%? We inject revision. Score ≥ 80%? Credential verified! Test out the developer fixture to test the 35% remediation band!`
        : `Tests evaluate conceptual understanding from first principles. Misconceptions trigger targeted practice automatically.`,
      actionLabel: "Test 35% Demo Fixture",
      actionTarget: "assessments-fixture",
      badge: "Diagnostics Active"
    };
  }

  if (activeModule === "agent-room") {
    return {
      state: "celebrating",
      headline: p === "genz"
        ? `You made it to the brain trust! 5 AI agents talking to each other. 🤖`
        : `Multi-Agent Consensus Room: Real-time agent collaboration stream.`,
      body: `The Skill Analyzer, Career Matcher, Roadmap Planner, Assessment Evaluator, and AI Mentor deliberate here to keep your roadmap accurate.`,
      badge: "Multi-Agent Hub"
    };
  }

  // 5. Default Dashboard Greeting
  if (p === "genz") {
    return {
      state: "happy",
      headline: `Good morning, ${studentName}! Career readiness is sitting at ${readiness}%. Let's get it! ✨`,
      body: `Targeting ${targetCareer}. Got questions or ready to knock out a diagnostic? I'm right here in your corner.`,
      actionLabel: "Check Skill DNA",
      actionTarget: "skill-dna",
      badge: "PIP Online"
    };
  } else if (p === "wholesome") {
    return {
      state: "happy",
      headline: `Good morning, ${studentName}! Wishing you a wonderful day of learning. ☀️`,
      body: `Your readiness for ${targetCareer} is ${readiness}%. Remember that steady daily steps lead to remarkable transformations.`,
      actionLabel: "View Roadmap",
      actionTarget: "roadmap",
      badge: "Gentle Reminder"
    };
  } else if (p === "gamer") {
    return {
      state: "happy",
      headline: `Ready to grind, ${studentName}? Current readiness stat: ${readiness}%! ⚔️`,
      body: `Daily quest active: Complete roadmap milestones and clear diagnostics to unlock high-tier job specs.`,
      actionLabel: "Resume Quest",
      actionTarget: "roadmap",
      badge: "Daily Quest"
    };
  } else {
    return {
      state: "happy",
      headline: `Telemetry Online for ${studentName}. Target: ${targetCareer} (${readiness}%).`,
      body: `All 5 backend agents are synced and monitoring your competency development. Proceed with your Phase 1 milestones.`,
      actionLabel: "Inspect DNA",
      actionTarget: "skill-dna",
      badge: "Systems Synced"
    };
  }
}
