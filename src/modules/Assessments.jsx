import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  FlaskConical,
  Clock,
  Layers,
  ChevronRight,
  History
} from 'lucide-react';
import { SMART_ASSESSMENTS } from '../data/assessmentData';

export default function Assessments({ 
  quizzes, 
  setQuizzes, 
  studentData, 
  onCompleteAssessment,
  setActiveModule,
  onTriggerToast 
}) {
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [completedResult, setCompletedResult] = useState(null);
  
  // Developer Fixture Quiz Target (default to JavaScript)
  const [fixtureTargetQuizId, setFixtureTargetQuizId] = useState("quiz-js");

  // Lookup active quiz from SMART_ASSESSMENTS or fallback
  const activeQuiz = SMART_ASSESSMENTS.find(q => q.id === activeQuizId) || 
    (quizzes || []).find(q => q.id === activeQuizId);

  // Completed quizzes count and average score from real history/quizzes
  const history = studentData?.assessmentHistory || [];
  const completedQuizzesList = (quizzes || []).filter(q => q.completed);
  const averageScore = history.length > 0 
    ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length)
    : completedQuizzesList.length > 0
      ? Math.round(completedQuizzesList.reduce((acc, q) => acc + (q.score || 0), 0) / completedQuizzesList.length)
      : 0;

  const verifiedCredentialsCount = (studentData?.skills || []).filter(s => s.verified).length;
  const adaptiveTasksCount = (studentData?.adaptiveTasks || []).length;

  const handleStartQuiz = (quiz) => {
    setActiveQuizId(quiz.id);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
    setCompletedResult(null);
  };

  const handleSelectOption = (optIndex) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optIndex
    }));
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleNextQuestion = async () => {
    setShowExplanation(false);
    if (currentQuestionIdx < activeQuiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Grade actual submitted answers
      let correct = 0;
      activeQuiz.questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correct++;
        }
      });

      const finalScore = Math.round((correct / activeQuiz.questions.length) * 100);

      const result = {
        quiz: activeQuiz,
        score: finalScore,
        selectedAnswers: { ...selectedAnswers },
        correctCount: correct,
        totalQuestions: activeQuiz.questions.length,
        isDevFixture: false
      };

      if (onCompleteAssessment) {
        const fullOutcome = await onCompleteAssessment(result);
        setCompletedResult(fullOutcome || result);
      } else {
        setCompletedResult(result);
      }

      setQuizFinished(true);
    }
  };

  const handleBackToQuizzes = () => {
    setActiveQuizId(null);
    setQuizFinished(false);
    setCompletedResult(null);
  };

  // Developer Fixture Handlers (specifically tests 35% remediation, 60% reinforcement, 85% mastery)
  const handleRunDeveloperFixture = async (score, label) => {
    const targetQuiz = SMART_ASSESSMENTS.find(q => q.id === fixtureTargetQuizId) || SMART_ASSESSMENTS[0];
    
    // Predetermined weak topics based on score band
    let weakTopics = [];
    if (score < 50) {
      weakTopics = targetQuiz.questions.slice(0, 2).map(q => q.topicTag).filter(Boolean);
      if (weakTopics.length === 0) weakTopics = ["Core Fundamentals", "Runtime Execution"];
    } else if (score < 80) {
      weakTopics = [targetQuiz.questions[0]?.topicTag || "Edge Cases & Optimization"];
    }

    const fixtureResult = {
      quiz: targetQuiz,
      score: score,
      selectedAnswers: {},
      weakTopicsOverride: weakTopics,
      isDevFixture: true,
      fixtureLabel: label
    };

    if (onCompleteAssessment) {
      const outcome = await onCompleteAssessment(fixtureResult);
      setCompletedResult(outcome || fixtureResult);
    } else {
      setCompletedResult(fixtureResult);
    }

    setActiveQuizId(targetQuiz.id);
    setQuizFinished(true);
    onTriggerToast(`Dev Fixture Triggered: ${score}% on ${targetQuiz.title}`);
  };

  return (
    <div className="assessments-redesign">
      {/* Header */}
      <div className="compact-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 className="compact-title">Smart Assessments & Adaptive Diagnostics</h1>
            <span className="badge-clean primary" style={{ fontSize: '0.7rem' }}>
              Adaptive Engine 2.0
            </span>
          </div>
          <p className="compact-subtitle">
            5-question diagnostic tests with actual answer grading. Scores under 50% automatically inject beginner revision lessons, 50–79% add targeted practice, and ≥80% verify mastery and unlock advanced phases.
          </p>
        </div>
      </div>

      {/* Developer Demo Fixtures Banner */}
      {!activeQuizId && (
        <div style={{
          background: 'rgba(139, 92, 246, 0.05)',
          border: '1px dashed #8B5CF6',
          borderRadius: '10px',
          padding: '16px 20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FlaskConical size={18} color="#8B5CF6" />
              <strong style={{ fontSize: '0.88rem', color: '#F8FAFC' }}>
                Developer Demo Fixture (Adaptive Threshold Testing)
              </strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Target Diagnostic:</span>
              <select 
                value={fixtureTargetQuizId} 
                onChange={(e) => setFixtureTargetQuizId(e.target.value)}
                style={{
                  background: '#16161F',
                  border: '1px solid #272734',
                  color: '#F8FAFC',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '0.78rem'
                }}
              >
                {SMART_ASSESSMENTS.map(q => (
                  <option key={q.id} value={q.id}>{q.title.split(' ')[0]} Diagnostic</option>
                ))}
              </select>
            </div>
          </div>

          <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '14px', lineHeight: 1.4 }}>
            Real 5-question quizzes naturally produce scores in 20% increments (0%, 20%, 40%, 60%, 80%, 100%). Use the fixtures below to test exact threshold responses, including testing the <strong style={{ color: '#FB7185' }}>35% low-score remediation band</strong> separately:
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button 
              className="btn-saas"
              style={{
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid #F43F5E',
                color: '#FB7185',
                fontSize: '0.78rem'
              }}
              onClick={() => handleRunDeveloperFixture(35, "Simulate 35% Score (< 50% Remediation)")}
            >
              <AlertTriangle size={13} />
              <span>Simulate 35% Score (&lt; 50% Remediation Band)</span>
            </button>

            <button 
              className="btn-saas"
              style={{
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid #F59E0B',
                color: '#FCD34D',
                fontSize: '0.78rem'
              }}
              onClick={() => handleRunDeveloperFixture(60, "Simulate 60% Score (50–79% Targeted Practice)")}
            >
              <BookOpen size={13} />
              <span>Simulate 60% Score (50–79% Practice Band)</span>
            </button>

            <button 
              className="btn-saas"
              style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid #10B981',
                color: '#34D399',
                fontSize: '0.78rem'
              }}
              onClick={() => handleRunDeveloperFixture(85, "Simulate 85% Score (≥ 80% Verified & Phase Unlock)")}
            >
              <ShieldCheck size={13} />
              <span>Simulate 85% Score (≥ 80% Verified &amp; Unlock)</span>
            </button>
          </div>
        </div>
      )}

      {/* Quiz List View */}
      {!activeQuizId && (
        <div>
          {/* Summary Metric Cards */}
          <div className="summary-grid-4" style={{ marginBottom: '24px' }}>
            <div className="summary-card">
              <span className="summary-label">Completed Tests</span>
              <div className="summary-value" style={{ color: '#10B981' }}>
                {completedQuizzesList.length} / {SMART_ASSESSMENTS.length}
              </div>
              <div className="summary-subtext">Diagnostics taken</div>
            </div>

            <div className="summary-card">
              <span className="summary-label">Average Score</span>
              <div className="summary-value" style={{ color: '#8B5CF6' }}>
                {averageScore}%
              </div>
              <div className="summary-subtext">Actual answer performance</div>
            </div>

            <div className="summary-card">
              <span className="summary-label">Verified Credentials</span>
              <div className="summary-value" style={{ color: '#38BDF8' }}>
                {verifiedCredentialsCount}
              </div>
              <div className="summary-subtext">Score &ge; 80% or project proof</div>
            </div>

            <div className="summary-card">
              <span className="summary-label">Adaptive Tasks Active</span>
              <div className="summary-value" style={{ color: '#F59E0B' }}>
                {adaptiveTasksCount}
              </div>
              <div className="summary-subtext">Injected into Roadmap</div>
            </div>
          </div>

          {/* Diagnostic Quiz Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {SMART_ASSESSMENTS.map(quiz => {
              const quizState = (quizzes || []).find(q => q.id === quiz.id) || quiz;
              const isCompleted = quizState.completed;
              const score = quizState.score;
              const isPassed = score !== null && score >= 80;
              const isRemediation = score !== null && score < 50;

              return (
                <div key={quiz.id} className="saas-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span className="badge-clean primary">{quiz.category}</span>
                      {isCompleted ? (
                        <span 
                          className={`badge-clean ${isPassed ? 'success' : isRemediation ? 'danger' : 'warning'}`} 
                          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          {isPassed ? <ShieldCheck size={12} /> : <AlertTriangle size={12} />}
                          Score: {score}%
                        </span>
                      ) : (
                        <span className="badge-clean neutral">Not Started</span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.05rem', color: '#F8FAFC', fontWeight: 600, marginBottom: '6px' }}>
                      {quiz.title}
                    </h3>

                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#64748B', marginBottom: '14px' }}>
                      <span>Level: {quiz.level}</span>
                      <span>5 Questions (MCQ)</span>
                      <span>~{quiz.timeMinutes} mins</span>
                    </div>

                    <div style={{ 
                      background: '#101017', 
                      border: '1px solid #272734', 
                      borderRadius: '6px',
                      padding: '8px 10px',
                      marginBottom: '16px',
                      fontSize: '0.75rem',
                      color: '#94A3B8'
                    }}>
                      Badge: <strong style={{ color: '#F8FAFC' }}>{quiz.badgeAwarded}</strong>
                    </div>
                  </div>

                  <button 
                    className={`btn-saas ${isCompleted ? 'btn-saas-secondary' : 'btn-saas-primary'}`}
                    onClick={() => handleStartQuiz(quiz)}
                    style={{ width: '100%' }}
                  >
                    <span>{isCompleted ? 'Retake Diagnostic' : 'Start Diagnostic'}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Assessment History & Audit Log */}
          <div className="saas-card">
            <div className="saas-card-header" style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <History size={16} color="#8B5CF6" />
                <h3 className="saas-card-title">Assessment Attempt History &amp; Adaptive Log</h3>
              </div>
              <span className="badge-clean neutral">{history.length} Attempts Logged</span>
            </div>

            {history.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 16px', color: '#64748B', fontSize: '0.82rem' }}>
                No diagnostic test attempts recorded yet. Start a diagnostic above or trigger a developer fixture to view graded history.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #272734', color: '#64748B', textAlign: 'left' }}>
                      <th style={{ padding: '8px 10px', fontWeight: 500 }}>Time</th>
                      <th style={{ padding: '8px 10px', fontWeight: 500 }}>Diagnostic</th>
                      <th style={{ padding: '8px 10px', fontWeight: 500 }}>Score</th>
                      <th style={{ padding: '8px 10px', fontWeight: 500 }}>Status Band</th>
                      <th style={{ padding: '8px 10px', fontWeight: 500 }}>Weak Topics</th>
                      <th style={{ padding: '8px 10px', fontWeight: 500 }}>Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, idx) => {
                      const isPassed = item.score >= 80;
                      const isRem = item.score < 50;
                      return (
                        <tr key={item.id || idx} style={{ borderBottom: '1px solid #1c1c28' }}>
                          <td style={{ padding: '10px 10px', color: '#94A3B8' }}>{item.timestamp}</td>
                          <td style={{ padding: '10px 10px', color: '#F8FAFC', fontWeight: 500 }}>{item.quizTitle}</td>
                          <td style={{ padding: '10px 10px', fontWeight: 600, color: isPassed ? '#10B981' : isRem ? '#FB7185' : '#F59E0B' }}>
                            {item.score}%
                          </td>
                          <td style={{ padding: '10px 10px' }}>
                            <span className={`badge-clean ${isPassed ? 'success' : isRem ? 'danger' : 'warning'}`} style={{ fontSize: '0.7rem' }}>
                              {item.bandStatus || (isPassed ? "Verified (≥80%)" : isRem ? "Remediation (<50%)" : "Practice (50-79%)")}
                            </span>
                          </td>
                          <td style={{ padding: '10px 10px', color: '#94A3B8' }}>
                            {(item.weakTopics && item.weakTopics.length > 0) ? (
                              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {item.weakTopics.map((wt, i) => (
                                  <span key={i} className="badge-clean neutral" style={{ fontSize: '0.65rem' }}>{wt}</span>
                                ))}
                              </div>
                            ) : (
                              <span style={{ color: '#10B981', fontSize: '0.72rem' }}>None detected</span>
                            )}
                          </td>
                          <td style={{ padding: '10px 10px' }}>
                            {item.isDevFixture ? (
                              <span className="badge-clean neutral" style={{ fontSize: '0.65rem', border: '1px dashed #8B5CF6' }}>Dev Fixture</span>
                            ) : (
                              <span className="badge-clean primary" style={{ fontSize: '0.65rem' }}>Real Answers</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Interactive Quiz Runner */}
      {activeQuizId && activeQuiz && (
        <div className="saas-card">
          {!quizFinished ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #272734', paddingBottom: '12px' }}>
                <div>
                  <button 
                    onClick={handleBackToQuizzes} 
                    style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.78rem', cursor: 'pointer', marginBottom: '2px' }}
                  >
                    ← Exit Diagnostic
                  </button>
                  <h2 style={{ fontSize: '1.15rem', color: '#F8FAFC', fontWeight: 600 }}>{activeQuiz.title}</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge-clean neutral" style={{ fontSize: '0.72rem' }}>
                    {activeQuiz.questions[currentQuestionIdx]?.topicTag}
                  </span>
                  <span className="badge-clean primary">
                    Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="clean-progress" style={{ marginBottom: '20px' }}>
                <div 
                  className="clean-progress-fill" 
                  style={{ width: `${((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100}%` }}
                ></div>
              </div>

              {(() => {
                const q = activeQuiz.questions[currentQuestionIdx];
                const selectedOpt = selectedAnswers[currentQuestionIdx];
                const isAnswerSelected = selectedOpt !== undefined;

                return (
                  <div>
                    <h3 style={{ fontSize: '1.05rem', color: '#F8FAFC', fontWeight: 500, lineHeight: 1.5, marginBottom: '14px' }}>
                      {q.question}
                    </h3>

                    {q.codeSnippet && (
                      <pre className="code-block-clean" style={{ marginBottom: '16px' }}>
                        <code>{q.codeSnippet}</code>
                      </pre>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      {q.options.map((option, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        const isCorrect = optIdx === q.correctIndex;

                        let itemBg = '#101017';
                        let itemBorder = '#272734';
                        let textColor = '#F8FAFC';

                        if (isChosen) {
                          itemBg = 'rgba(139, 92, 246, 0.1)';
                          itemBorder = 'var(--accent-primary)';
                        }

                        if (showExplanation) {
                          if (isCorrect) {
                            itemBg = 'rgba(16, 185, 129, 0.1)';
                            itemBorder = '#10B981';
                            textColor = '#10B981';
                          } else if (isChosen && !isCorrect) {
                            itemBg = 'rgba(244, 63, 94, 0.1)';
                            itemBorder = '#F43F5E';
                            textColor = '#FB7185';
                          }
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(optIdx)}
                            style={{
                              background: itemBg,
                              border: `1px solid ${itemBorder}`,
                              borderRadius: '6px',
                              padding: '10px 14px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: showExplanation ? 'default' : 'pointer',
                              transition: 'all 150ms ease'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ 
                                width: 20, 
                                height: 20, 
                                borderRadius: '4px', 
                                border: '1px solid #38384D',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.72rem',
                                background: isChosen ? 'var(--accent-primary)' : 'transparent',
                                color: isChosen ? '#fff' : '#64748B'
                              }}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span style={{ fontSize: '0.84rem', color: textColor }}>{option}</span>
                            </div>

                            {showExplanation && (
                              <div>
                                {isCorrect ? (
                                  <CheckCircle2 size={16} color="#10B981" />
                                ) : isChosen ? (
                                  <XCircle size={16} color="#F43F5E" />
                                ) : null}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {showExplanation && (
                      <div style={{
                        background: '#101017',
                        border: '1px solid #272734',
                        borderRadius: '6px',
                        padding: '12px',
                        marginBottom: '20px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.78rem', color: '#8B5CF6', fontWeight: 600 }}>
                            Codex Feedback &amp; Topic Analysis:
                          </span>
                          <span className="badge-clean neutral" style={{ fontSize: '0.65rem' }}>
                            {q.topicTag}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.5 }}>
                          {q.explanation}
                        </p>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      {!showExplanation ? (
                        <button 
                          className="btn-saas btn-saas-primary btn-saas-sm"
                          disabled={!isAnswerSelected}
                          onClick={handleCheckAnswer}
                          style={{ opacity: isAnswerSelected ? 1 : 0.5 }}
                        >
                          Check Answer
                        </button>
                      ) : (
                        <button 
                          className="btn-saas btn-saas-primary btn-saas-sm"
                          onClick={handleNextQuestion}
                        >
                          <span>{currentQuestionIdx < activeQuiz.questions.length - 1 ? 'Next Question' : 'Complete & Grade Diagnostic'}</span>
                          <ArrowRight size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            /* Detailed Result Screen with Score Band, Motivational Feedback, Weak Topics & Question Review */
            <div>
              {(() => {
                const finalScore = completedResult?.score ?? (activeQuiz.score || 0);
                const feedback = completedResult?.feedback;
                const weakTopics = completedResult?.weakTopics || [];
                const adaptiveTasks = completedResult?.adaptiveTasks || [];
                const isPassed = finalScore >= 80;
                const isRemediation = finalScore < 50;

                const scoreColor = isPassed ? '#10B981' : isRemediation ? '#FB7185' : '#F59E0B';
                const scoreBg = isPassed ? 'rgba(16, 185, 129, 0.1)' : isRemediation ? 'rgba(244, 63, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)';

                return (
                  <div>
                    {/* Top Result Banner */}
                    <div style={{ textAlign: 'center', padding: '24px 16px 20px 16px', borderBottom: '1px solid #272734' }}>
                      <div style={{ 
                        width: 64, 
                        height: 64, 
                        borderRadius: '50%', 
                        background: scoreBg, 
                        border: `1px solid ${scoreColor}`,
                        margin: '0 auto 14px auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isPassed ? (
                          <Award size={32} color="#10B981" />
                        ) : isRemediation ? (
                          <AlertTriangle size={32} color="#FB7185" />
                        ) : (
                          <BookOpen size={32} color="#F59E0B" />
                        )}
                      </div>

                      <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '6px' }}>
                        Diagnostic Assessment Complete
                      </h2>

                      <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '10px' }}>
                        {activeQuiz.title}
                      </p>

                      <div style={{ fontSize: '2.8rem', fontWeight: 700, color: scoreColor, marginBottom: '8px' }}>
                        {finalScore}%
                      </div>

                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`badge-clean ${isPassed ? 'success' : isRemediation ? 'danger' : 'warning'}`} style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                          {isPassed ? "Passed & Verified (≥ 80%)" : isRemediation ? "Remediation Needed (< 50%)" : "Needs Targeted Practice (50% – 79%)"}
                        </span>
                        {completedResult?.isDevFixture && (
                          <span className="badge-clean neutral" style={{ fontSize: '0.72rem', border: '1px dashed #8B5CF6' }}>
                            Developer Fixture Result
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Supportive Motivational Feedback Card */}
                    {feedback && (
                      <div style={{
                        background: '#101017',
                        border: `1px solid ${feedback.color}40`,
                        borderLeft: `4px solid ${feedback.color}`,
                        borderRadius: '8px',
                        padding: '16px 20px',
                        marginTop: '20px',
                        marginBottom: '20px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Sparkles size={16} color={feedback.color} />
                            <h4 style={{ fontSize: '0.92rem', color: '#F8FAFC', fontWeight: 600 }}>
                              {feedback.headline}
                            </h4>
                          </div>
                          {completedResult?.isLlmPowered && (
                            <span className="badge-clean emerald" style={{ fontSize: '0.65rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                              ✨ Ollama Local LLM (llama3.2:1b)
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
                          {feedback.message}
                        </p>
                      </div>
                    )}

                    {/* Adaptive Actions Taken */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                      {/* Identified Weak Topics */}
                      <div style={{ background: '#101017', border: '1px solid #272734', borderRadius: '8px', padding: '14px 16px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <AlertTriangle size={14} color="#F59E0B" />
                          <span>Identified Knowledge Gaps</span>
                        </div>

                        {weakTopics.length > 0 ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {weakTopics.map((topic, i) => (
                              <span key={i} className="badge-clean danger" style={{ fontSize: '0.75rem' }}>
                                {topic}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p style={{ fontSize: '0.78rem', color: '#10B981' }}>
                            Zero weak topics identified! Flawless conceptual mastery.
                          </p>
                        )}
                      </div>

                      {/* Adaptive Curriculum Changes */}
                      <div style={{ background: '#101017', border: '1px solid #272734', borderRadius: '8px', padding: '14px 16px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Layers size={14} color="#8B5CF6" />
                          <span>Adaptive Roadmap Updates</span>
                        </div>

                        {adaptiveTasks.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {adaptiveTasks.map(t => (
                              <div key={t.id} style={{ fontSize: '0.76rem', color: '#C084FC', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <ChevronRight size={12} color="#8B5CF6" />
                                <span>{t.title}</span>
                              </div>
                            ))}
                          </div>
                        ) : isPassed ? (
                          <p style={{ fontSize: '0.78rem', color: '#10B981' }}>
                            Passed with &ge; 80%! Verified badge awarded &amp; next learning phase unlocked.
                          </p>
                        ) : (
                          <p style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                            Curriculum calibrated to your performance.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Question-by-Question Diagnostic Review (if real quiz completed) */}
                    {activeQuiz.questions && !completedResult?.isDevFixture && (
                      <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '0.9rem', color: '#F8FAFC', fontWeight: 600, marginBottom: '12px' }}>
                          Question-by-Question Diagnostic Review:
                        </h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {activeQuiz.questions.map((q, qIdx) => {
                            const userAns = completedResult?.selectedAnswers ? completedResult.selectedAnswers[qIdx] : undefined;
                            const isCorrect = userAns === q.correctIndex;

                            return (
                              <div 
                                key={q.id || qIdx}
                                style={{
                                  background: '#101017',
                                  border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)'}`,
                                  borderRadius: '6px',
                                  padding: '12px 14px'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {isCorrect ? (
                                      <CheckCircle2 size={16} color="#10B981" />
                                    ) : (
                                      <XCircle size={16} color="#FB7185" />
                                    )}
                                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#F8FAFC' }}>
                                      Question {qIdx + 1}
                                    </span>
                                    <span className="badge-clean neutral" style={{ fontSize: '0.65rem' }}>
                                      {q.topicTag}
                                    </span>
                                  </div>
                                  <span style={{ fontSize: '0.75rem', color: isCorrect ? '#10B981' : '#FB7185', fontWeight: 600 }}>
                                    {isCorrect ? "+20 Points" : "Missed"}
                                  </span>
                                </div>

                                <p style={{ fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '6px', lineHeight: 1.4 }}>
                                  {q.question}
                                </p>

                                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                                  <strong style={{ color: '#F8FAFC' }}>Correct:</strong> {q.options[q.correctIndex]}
                                  {userAns !== undefined && !isCorrect && (
                                    <span style={{ marginLeft: '12px', color: '#FB7185' }}>
                                      (Your answer: {q.options[userAns]})
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <button 
                        className="btn-saas btn-saas-secondary"
                        onClick={() => handleStartQuiz(activeQuiz)}
                      >
                        <RotateCcw size={14} />
                        <span>Retake Diagnostic</span>
                      </button>

                      {setActiveModule && (
                        <button 
                          className="btn-saas btn-saas-primary"
                          onClick={() => setActiveModule('roadmap')}
                        >
                          <BookOpen size={14} />
                          <span>View Adaptive Roadmap</span>
                        </button>
                      )}

                      <button 
                        className="btn-saas btn-saas-secondary"
                        onClick={handleBackToQuizzes}
                      >
                        <span>Back to All Diagnostics</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
