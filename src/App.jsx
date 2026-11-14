import React, { useState, useEffect, useMemo } from 'react';
import LandingPage from './components/LandingPage';
import { SignInPage, SignUpPage } from './components/AuthPages';
import OnboardingWizard from './components/OnboardingWizard';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';
import PipCompanion from './components/PipCompanion';

import Dashboard from './modules/Dashboard';
import Profile from './modules/Profile';
import SkillDNA from './modules/SkillDNA';
import CareerExplorer from './modules/CareerExplorer';
import Roadmap from './modules/Roadmap';
import Assessments from './modules/Assessments';
import AgentRoom from './modules/AgentRoom';
import CareerTimeMachine from './modules/CareerTimeMachine';
import AIMentor from './modules/AIMentor';
import SkillPassport from './modules/SkillPassport';

import { 
  calculateCareerMatch, 
  analyzeSkillDNA, 
  generateDynamicRoadmap,
  processAssessmentResult,
  CAREER_REQUIREMENTS 
} from './utils/careerEngine';
import { loadStudentState, saveStudentState, resetStudentState, DEFAULT_INITIAL_STATE } from './utils/storage';
import { SMART_ASSESSMENTS } from './data/assessmentData';
import { evaluateAssessmentWithOrchestrator } from './services/api';

export default function App() {
  // App View Mode: 'landing' | 'signin' | 'signup' | 'onboarding' | 'dashboard'
  const [appView, setAppView] = useState(() => {
    try {
      return localStorage.getItem('skillpilot_app_view') || 'landing';
    } catch (e) {
      return 'landing';
    }
  });
  const [activeModule, setActiveModule] = useState(() => {
    try {
      return localStorage.getItem('skillpilot_active_module') || 'dashboard';
    } catch (e) {
      return 'dashboard';
    }
  });
  const [studentData, setStudentData] = useState(() => loadStudentState());
  const [liveAgentEvents, setLiveAgentEvents] = useState([]);
  const [latestAssessmentResult, setLatestAssessmentResult] = useState(null);

  // Persist view navigation across page reloads
  useEffect(() => {
    try {
      localStorage.setItem('skillpilot_app_view', appView);
    } catch (e) {}
  }, [appView]);

  useEffect(() => {
    try {
      localStorage.setItem('skillpilot_active_module', activeModule);
    } catch (e) {}
  }, [activeModule]);
  const [assessments, setAssessments] = useState(() => {
    const history = loadStudentState().assessmentHistory || [];
    return SMART_ASSESSMENTS.map(quiz => {
      const attempts = history.filter(h => h.quizId === quiz.id);
      if (attempts.length > 0) {
        const highestScore = Math.max(...attempts.map(a => a.score));
        return {
          ...quiz,
          completed: true,
          score: highestScore,
          latestScore: attempts[0].score,
          attemptsCount: attempts.length
        };
      }
      return {
        ...quiz,
        completed: false,
        score: null,
        attemptsCount: 0
      };
    });
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);
  const [onboardingInitialUser, setOnboardingInitialUser] = useState(null);

  // Persist studentData to localStorage on changes
  useEffect(() => {
    saveStudentState(studentData);
  }, [studentData]);

  const triggerToast = (message) => {
    const newToast = { id: Date.now(), message };
    setToasts(prev => [...prev.slice(-2), newToast]);
    setTimeout(() => {
      dismissToast(newToast.id);
    }, 3500);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Target Career info
  const targetCareerId = studentData.targetCareerId || "fullstack";
  const currentCareerConfig = CAREER_REQUIREMENTS[targetCareerId] || CAREER_REQUIREMENTS["fullstack"];

  // DYNAMIC DERIVED COMPUTATIONS
  const careerMatch = useMemo(() => {
    return calculateCareerMatch(
      studentData.skills, 
      assessments, 
      studentData.projects || [], 
      targetCareerId
    );
  }, [studentData.skills, assessments, studentData.projects, targetCareerId]);

  const skillDna = useMemo(() => {
    return analyzeSkillDNA(
      studentData.skills, 
      assessments, 
      studentData.projects || [], 
      targetCareerId
    );
  }, [studentData.skills, assessments, studentData.projects, targetCareerId]);

  const roadmapPhases = useMemo(() => {
    return generateDynamicRoadmap(
      studentData.skills, 
      targetCareerId, 
      new Set(studentData.completedTaskIds || []),
      studentData.adaptiveTasks || [],
      new Set(studentData.unlockedPhaseIds || [])
    );
  }, [studentData.skills, targetCareerId, studentData.completedTaskIds, studentData.adaptiveTasks, studentData.unlockedPhaseIds]);

  // Assessment Completion & Adaptive Handler (Orchestrator Powered)
  const handleAssessmentCompleted = async ({ quiz, score, selectedAnswers = {}, weakTopicsOverride = null, isDevFixture = false }) => {
    // Call FastAPI Multi-Agent Orchestrator
    const profilePayload = {
      name: studentData.name,
      targetCareerId: targetCareerId,
      targetRole: currentCareerConfig.title,
      skills: studentData.skills,
      projects: studentData.projects || [],
      completedTaskIds: studentData.completedTaskIds || []
    };

    const submissionPayload = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      skillId: quiz.skillId,
      score,
      selectedAnswers,
      weakTopicsOverride,
      isDevFixture,
      personality: localStorage.getItem("skillpilot_pip_personality") || "genz"
    };

    const backendResult = await evaluateAssessmentWithOrchestrator(profilePayload, submissionPayload);

    let outcome;
    if (backendResult) {
      outcome = {
        score: backendResult.score,
        feedback: {
          band: backendResult.band,
          status: backendResult.bandStatus,
          headline: backendResult.mentorHeadline,
          message: backendResult.mentorMessage,
          color: backendResult.band === "passed" ? "#10B981" : backendResult.band === "remediation" ? "#FB7185" : "#F59E0B"
        },
        weakTopics: backendResult.weakTopics,
        adaptiveTasks: backendResult.adaptiveTasks,
        isLlmPowered: backendResult.isLlmPowered || false,
        provider: backendResult.provider || "rule-based-fallback",
        adaptiveLogEntry: {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          quizId: quiz.id,
          quizTitle: quiz.title,
          skillId: quiz.skillId,
          score,
          band: backendResult.band,
          bandStatus: backendResult.bandStatus,
          headline: backendResult.mentorHeadline,
          message: backendResult.mentorMessage,
          weakTopics: backendResult.weakTopics,
          tasksAdded: backendResult.adaptiveTasks.map(t => t.title),
          unlockedPhase: backendResult.unlockedPhase,
          isLlmPowered: backendResult.isLlmPowered || false,
          provider: backendResult.provider || "rule-based-fallback"
        }
      };

      if (backendResult.agentEvents && backendResult.agentEvents.length > 0) {
        setLiveAgentEvents(prev => [...backendResult.agentEvents, ...prev]);
      }
    } else {
      outcome = processAssessmentResult(quiz, score, selectedAnswers, weakTopicsOverride);
    }

    const isPassed = score >= 80;

    const attemptRecord = {
      id: `att-${Date.now()}`,
      quizId: quiz.id,
      quizTitle: quiz.title,
      skillId: quiz.skillId,
      score,
      band: outcome.feedback.band,
      bandStatus: outcome.feedback.status,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      weakTopics: outcome.weakTopics,
      isDevFixture: !!isDevFixture
    };

    // Determine unlocked phase
    let unlockedPhaseKey = null;
    if (isPassed) {
      if (quiz.skillId === 'javascript') unlockedPhaseKey = 'fs-phase-2';
      else if (quiz.skillId === 'react') unlockedPhaseKey = 'fs-phase-3';
      else if (quiz.skillId === 'sql') unlockedPhaseKey = 'da-phase-2';
    }

    setStudentData(prev => {
      const existingSkills = [...prev.skills];
      const normQuizSkill = quiz.skillId;

      if (isPassed && normQuizSkill) {
        const matchIdx = existingSkills.findIndex(s => 
          s.id === normQuizSkill || 
          s.name.toLowerCase().includes(normQuizSkill.toLowerCase())
        );

        if (matchIdx !== -1) {
          const old = existingSkills[matchIdx];
          existingSkills[matchIdx] = {
            ...old,
            verified: true,
            status: "Mastered",
            proficiency: Math.max(old.proficiency || 0, score),
            confidence: Math.max(old.confidence || 0, score)
          };
        } else {
          existingSkills.push({
            id: normQuizSkill,
            name: quiz.title.split(' ')[0],
            category: quiz.category,
            proficiency: score,
            confidence: score,
            verified: true,
            status: "Mastered"
          });
        }
      }

      const unlockedSet = new Set(prev.unlockedPhaseIds || []);
      if (unlockedPhaseKey) {
        unlockedSet.add(unlockedPhaseKey);
      }

      // Prepend newly added adaptive tasks (deduplicated)
      const currentTasks = prev.adaptiveTasks || [];
      const currentTaskIds = new Set(currentTasks.map(t => t.id));
      const newlyAddedTasks = outcome.adaptiveTasks.filter(t => !currentTaskIds.has(t.id));
      const updatedAdaptiveTasks = [...newlyAddedTasks, ...currentTasks];

      // Prepend adaptive log entry
      const updatedAdaptiveLog = [outcome.adaptiveLogEntry, ...(prev.adaptiveLog || [])];

      // Prepend attempt history
      const updatedHistory = [attemptRecord, ...(prev.assessmentHistory || [])];

      return {
        ...prev,
        skills: existingSkills,
        assessmentHistory: updatedHistory,
        adaptiveTasks: updatedAdaptiveTasks,
        adaptiveLog: updatedAdaptiveLog,
        unlockedPhaseIds: Array.from(unlockedSet)
      };
    });

    // Update assessments status
    setAssessments(prev => prev.map(q => {
      if (q.id === quiz.id) {
        return {
          ...q,
          completed: true,
          score: Math.max(q.score || 0, score),
          latestScore: score,
          attemptsCount: (q.attemptsCount || 0) + 1
        };
      }
      return q;
    }));

    // Notify PIP Companion of assessment outcome
    setLatestAssessmentResult({
      quizTitle: quiz.title,
      score: score,
      band: outcome.feedback.band,
      weakTopics: outcome.weakTopics,
      mentorHeadline: outcome.feedback.headline,
      mentorMessage: outcome.feedback.message,
      isLlmPowered: outcome.isLlmPowered || false,
      provider: outcome.provider || "rule-based-fallback"
    });

    triggerToast(
      isPassed
        ? `Assessment Passed (${score}%)! Credential verified & Phase 2 unlocked.`
        : score < 50
          ? `Diagnostic Complete (${score}%). Beginner revision lessons added to Roadmap.`
          : `Diagnostic Complete (${score}%). Targeted practice exercises added to Roadmap.`
    );

    return outcome;
  };

  // View Navigation Handlers
  const handleTryDemo = () => {
    // If not currently Alex Rivera, reset to Alex Rivera demo baseline
    if (studentData.name !== DEFAULT_INITIAL_STATE.name) {
      setStudentData(DEFAULT_INITIAL_STATE);
      setAssessments(SMART_ASSESSMENTS.map(q => ({ ...q, completed: false, score: null, attemptsCount: 0 })));
    }
    setAppView('dashboard');
    setActiveModule('dashboard');
    triggerToast("Entered Demo Mode: Alex Rivera (Full Stack Developer Path).");
  };

  const handleGetStarted = () => {
    setAppView('signup');
  };

  const handleSignIn = () => {
    setAppView('signin');
  };

  const handleSignInSuccess = (user) => {
    setAppView('dashboard');
    triggerToast(`Welcome back, ${user.name}!`);
  };

  const handleSignUpSuccess = (user) => {
    setOnboardingInitialUser(user);
    setAppView('onboarding');
  };

  const handleCompleteOnboarding = (newLearner) => {
    setStudentData(newLearner);
    setAppView('dashboard');
    setActiveModule('dashboard');
    triggerToast(`Welcome to SkillPilot AI, ${newLearner.name}! Your dynamic roadmap is ready.`);
  };

  const handleExitToLanding = () => {
    setAppView('landing');
  };

  // Skill Management Handlers
  const handleAddSkill = (newSkill) => {
    setStudentData(prev => ({
      ...prev,
      skills: [...prev.skills, { ...newSkill, id: `skill-${Date.now()}` }]
    }));
    triggerToast(`Added ${newSkill.name} to your skills.`);
  };

  const handleEditSkill = (updatedSkill) => {
    setStudentData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === updatedSkill.id ? updatedSkill : s)
    }));
    triggerToast(`Updated ${updatedSkill.name}.`);
  };

  const handleRemoveSkill = (skillId) => {
    const target = studentData.skills.find(s => s.id === skillId);
    setStudentData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== skillId)
    }));
    triggerToast(`Removed ${target ? target.name : 'skill'}.`);
  };

  const handleSelectCareer = (careerId) => {
    const career = CAREER_REQUIREMENTS[careerId];
    if (!career) return;
    setStudentData(prev => ({
      ...prev,
      targetCareerId: careerId,
      targetRole: career.title
    }));
    triggerToast(`Primary career target updated to ${career.title}.`);
  };

  const handleToggleRoadmapTask = (taskId) => {
    setStudentData(prev => {
      const currentCompleted = new Set(prev.completedTaskIds || []);
      const isCompleted = currentCompleted.has(taskId);
      if (isCompleted) {
        currentCompleted.delete(taskId);
      } else {
        currentCompleted.add(taskId);
        triggerToast("Roadmap milestone completed! +50 XP");
      }
      return {
        ...prev,
        completedTaskIds: Array.from(currentCompleted)
      };
    });
  };

  const handleResetData = () => {
    const fresh = resetStudentState();
    setStudentData(fresh);
    setAssessments(SMART_ASSESSMENTS.map(q => ({ ...q, completed: false, score: null, attemptsCount: 0 })));
    setLatestAssessmentResult(null);
    triggerToast("Reset student state to baseline Alex Rivera demo data.");
  };

  // Dashboard Module Renderer
  const renderDashboardModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <Dashboard 
            studentData={studentData}
            careerMatch={careerMatch}
            skillDna={skillDna}
            roadmapPhases={roadmapPhases}
            setActiveModule={setActiveModule}
            onToggleRoadmapTask={handleToggleRoadmapTask}
          />
        );
      case 'profile':
        return (
          <Profile 
            studentData={studentData} 
            setStudentData={setStudentData} 
            onAddSkill={handleAddSkill}
            onEditSkill={handleEditSkill}
            onRemoveSkill={handleRemoveSkill}
            assessments={assessments}
            onResetData={handleResetData}
            onTriggerToast={triggerToast} 
          />
        );
      case 'skill-dna':
        return (
          <SkillDNA 
            studentData={studentData}
            careerMatch={careerMatch}
            skillDna={skillDna}
            onSelectCareer={handleSelectCareer}
            setActiveModule={setActiveModule}
            onTriggerToast={triggerToast} 
          />
        );
      case 'career-explorer':
        return (
          <CareerExplorer 
            studentData={studentData} 
            careerMatch={careerMatch}
            assessments={assessments}
            onSelectCareer={handleSelectCareer}
            setActiveModule={setActiveModule} 
            onTriggerToast={triggerToast} 
          />
        );
      case 'roadmap':
        return (
          <Roadmap 
            studentData={studentData} 
            careerMatch={careerMatch}
            roadmapPhases={roadmapPhases}
            onToggleTask={handleToggleRoadmapTask}
            setActiveModule={setActiveModule}
            onTriggerToast={triggerToast} 
          />
        );
      case 'assessments':
        return (
          <Assessments 
            quizzes={assessments}
            setQuizzes={setAssessments}
            studentData={studentData}
            onCompleteAssessment={handleAssessmentCompleted}
            setActiveModule={setActiveModule}
            onTriggerToast={triggerToast} 
          />
        );
      case 'agent-room':
        return (
          <AgentRoom 
            studentData={studentData} 
            careerMatch={careerMatch}
            liveEvents={liveAgentEvents}
            onTriggerToast={triggerToast} 
          />
        );
      case 'time-machine':
        return (
          <CareerTimeMachine 
            studentData={studentData} 
            careerMatch={careerMatch}
            onSelectCareer={handleSelectCareer}
            setActiveModule={setActiveModule} 
            onTriggerToast={triggerToast} 
          />
        );
      case 'ai-mentor':
        return (
          <AIMentor 
            studentData={studentData} 
            careerMatch={careerMatch}
            onTriggerToast={triggerToast} 
          />
        );
      case 'skill-passport':
        return (
          <SkillPassport 
            studentData={studentData} 
            careerMatch={careerMatch}
            assessments={assessments}
            onTriggerToast={triggerToast} 
          />
        );
      default:
        return (
          <Dashboard 
            studentData={studentData}
            careerMatch={careerMatch}
            skillDna={skillDna}
            roadmapPhases={roadmapPhases}
            setActiveModule={setActiveModule}
            onToggleRoadmapTask={handleToggleRoadmapTask}
          />
        );
    }
  };

  // View Renderer
  const renderCurrentView = () => {
    if (appView === 'landing') {
      return (
        <LandingPage 
          onTryDemo={handleTryDemo}
          onGetStarted={handleGetStarted}
          onSignIn={handleSignIn}
        />
      );
    }

    if (appView === 'signin') {
      return (
        <SignInPage 
          onSignInSuccess={handleSignInSuccess}
          onSwitchToSignUp={handleGetStarted}
          onTryDemo={handleTryDemo}
          onBackToLanding={handleExitToLanding}
        />
      );
    }

    if (appView === 'signup') {
      return (
        <SignUpPage 
          onSignUpSuccess={handleSignUpSuccess}
          onSwitchToSignIn={handleSignIn}
          onTryDemo={handleTryDemo}
          onBackToLanding={handleExitToLanding}
        />
      );
    }

    if (appView === 'onboarding') {
      return (
        <OnboardingWizard 
          initialUser={onboardingInitialUser}
          onComplete={handleCompleteOnboarding}
          onSkipToDemo={handleTryDemo}
        />
      );
    }

    return (
      <div className="app-container">
        <Sidebar 
          activeModule={activeModule} 
          setActiveModule={setActiveModule} 
          studentData={studentData} 
          readinessScore={careerMatch.readinessScore}
          onExitToLanding={handleExitToLanding}
        />

        <main className="main-content">
          <Header 
            studentData={studentData} 
            targetCareerTitle={currentCareerConfig.title}
            readinessScore={careerMatch.readinessScore}
            setActiveModule={setActiveModule} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onExitToLanding={handleExitToLanding}
          />

          <div className="content-viewport">
            {renderDashboardModule()}
          </div>
        </main>
      </div>
    );
  };

  return (
    <div className="skillpilot-app-wrapper">
      {renderCurrentView()}

      <PipCompanion 
        view={appView}
        activeModule={activeModule}
        studentData={studentData}
        careerMatch={careerMatch}
        latestAssessment={latestAssessmentResult}
        setActiveModule={setActiveModule}
        onTryDemo={handleTryDemo}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
