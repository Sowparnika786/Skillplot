export const initialStudentData = {
  name: "Alex Rivera",
  handle: "@alex_codes",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  title: "Aspiring Full Stack Developer",
  currentRole: "Junior Data Analyst & Python Scripter",
  targetRole: "Full Stack Developer",
  location: "San Francisco, CA (Remote)",
  bio: "Experienced Python and SQL developer transitioning into end-to-end web engineering. Passionate about AI-integrated web applications, fast APIs, and modern component architectures.",
  readinessScore: 58,
  targetDate: "6 Months",
  weeklyStudyHours: 18,
  streakDays: 14,
  completedTasksCount: 26,
  totalTasksCount: 48,
  
  // Current mastered & learning skills
  skills: [
    { id: "python", name: "Python", category: "Backend / Scripting", proficiency: 85, confidence: 90, status: "Mastered", verified: true, level: "Advanced", icon: "Code2" },
    { id: "sql", name: "SQL (PostgreSQL / SQLite)", category: "Database", proficiency: 72, confidence: 78, status: "Mastered", verified: true, level: "Intermediate", icon: "Database" },
    { id: "html", name: "HTML5 / Semantic Web", category: "Frontend", proficiency: 45, confidence: 55, status: "Proficient", verified: true, level: "Familiar", icon: "Layout" },
    { id: "css", name: "CSS3 / Modern Flexbox", category: "Frontend", proficiency: 30, confidence: 35, status: "In Progress", verified: false, level: "Learning", icon: "Palette" },
    { id: "javascript", name: "JavaScript (ES6+)", category: "Frontend", proficiency: 18, confidence: 25, status: "Missing Skill", verified: false, level: "Gap", icon: "Flame" },
    { id: "react", name: "React 19 & Component Architecture", category: "Frontend", proficiency: 10, confidence: 15, status: "Missing Skill", verified: false, level: "Gap", icon: "Atom" },
    { id: "nodejs", name: "Node.js & Express REST APIs", category: "Backend", proficiency: 8, confidence: 12, status: "Missing Skill", verified: false, level: "Gap", icon: "Server" },
    { id: "git", name: "Git & GitHub Collaboration", category: "DevOps", proficiency: 65, confidence: 70, status: "Proficient", verified: true, level: "Intermediate", icon: "GitBranch" },
  ],

  projects: [
    {
      id: "p1",
      title: "Automated Financial Data Pipeline",
      tech: ["Python", "Pandas", "PostgreSQL", "SQLAlchemy"],
      description: "Production-ready ETL pipeline extracting stock feeds, aggregating market anomalies, and populating normalized PostgreSQL schemas with indexing.",
      github: "github.com/alex-dev/financial-etl-pipeline",
      stars: 38,
      verifiedScore: 94,
      status: "Verified & Evaluated",
      impact: "Processes 250k daily records with 99.8% data integrity validation."
    },
    {
      id: "p2",
      title: "Customer Retention Analytics Query Suite",
      tech: ["SQL", "PostgreSQL", "Window Functions", "Data Modeling"],
      description: "Complex analytical SQL script repository utilizing recursive CTEs, window partitioning, and churn cohort analysis.",
      github: "github.com/alex-dev/sql-retention-suite",
      stars: 19,
      verifiedScore: 91,
      status: "Verified & Evaluated",
      impact: "Reduced reporting query runtime by 42% through query plan optimization."
    },
    {
      id: "p3",
      title: "Personal Portfolio & Documentation Site",
      tech: ["HTML5", "CSS3", "Semantic Elements"],
      description: "Accessible multi-page personal developer portal built with semantic HTML tags and responsive typography.",
      github: "github.com/alex-dev/developer-portfolio-v1",
      stars: 12,
      verifiedScore: 82,
      status: "In Progress",
      impact: "Lighthouse accessibility score 98/100."
    }
  ],

  certifications: [
    {
      id: "c1",
      name: "Python for Data Engineering & Automation",
      issuer: "DeepLearning & Meta Learning",
      date: "Dec 2025",
      credentialId: "CERT-PY-882194",
      status: "Verified Credential",
      grade: "Top 5% Percentile"
    },
    {
      id: "c2",
      name: "Advanced Relational Databases & SQL Optimization",
      issuer: "Postgres Guild Academy",
      date: "Oct 2025",
      credentialId: "CERT-SQL-33109",
      status: "Verified Credential",
      grade: "Grade A+"
    }
  ],

  careerGoals: [
    { id: "g1", text: "Master Modern JavaScript (Async/Await, Closures, DOM manipulation)", targetDate: "Month 1-2", status: "Active Focus" },
    { id: "g2", text: "Build 3 production-grade React applications with clean state management", targetDate: "Month 3-4", status: "Upcoming" },
    { id: "g3", text: "Create full-stack RESTful & GraphQL microservices with Node.js & Express", targetDate: "Month 5", status: "Upcoming" },
    { id: "g4", text: "Land a Full Stack Developer role with $120k+ compensation", targetDate: "Month 6", status: "Ultimate Target" }
  ]
};

export const careerRoles = [
  {
    id: "fullstack",
    title: "Full Stack Developer",
    matchPercentage: 58,
    salaryRange: "$115,000 - $155,000",
    openings: "42,800+ Active Roles",
    difficulty: "Balanced",
    timeToReadiness: "16-20 Weeks",
    description: "Build complete end-to-end web software, bridging client-side interactive React interfaces with robust Node/Python server backends and relational databases.",
    requiredSkills: [
      { name: "JavaScript (ES6+)", status: "Missing (Top Priority)", weight: "High" },
      { name: "React Ecosystem", status: "Missing (Top Priority)", weight: "High" },
      { name: "Node.js & Express", status: "Missing (High Priority)", weight: "High" },
      { name: "Python / Backend", status: "Mastered", weight: "Medium" },
      { name: "SQL & Databases", status: "Mastered", weight: "Medium" },
      { name: "REST API Architecture", status: "In Progress", weight: "High" }
    ],
    marketTrends: {
      yoyGrowth: "+18.4%",
      topHiringHubs: ["San Francisco", "New York", "Austin", "Remote Worldwide"],
      coreFrameworks: ["React 19", "Next.js", "Node.js", "PostgreSQL", "Docker"]
    }
  },
  {
    id: "ai-fullstack",
    title: "AI-Integrated Full Stack Engineer",
    matchPercentage: 64,
    salaryRange: "$135,000 - $185,000",
    openings: "28,500+ Active Roles",
    difficulty: "Advanced",
    timeToReadiness: "22-26 Weeks",
    description: "Design and implement modern AI-powered applications connecting LLM orchestration (LangChain, OpenAI, Gemini API) with React interfaces and streaming API servers.",
    requiredSkills: [
      { name: "Python & AI Tools", status: "Mastered", weight: "High" },
      { name: "SQL & Vector DBs", status: "Mastered", weight: "High" },
      { name: "JavaScript & React", status: "Missing (Top Priority)", weight: "High" },
      { name: "Node.js Streaming", status: "Missing (High Priority)", weight: "High" },
      { name: "FastAPI / Python APIs", status: "Proficient", weight: "Medium" },
      { name: "Prompt Engineering & RAG", status: "In Progress", weight: "High" }
    ],
    marketTrends: {
      yoyGrowth: "+44.2%",
      topHiringHubs: ["San Francisco", "Seattle", "Remote"],
      coreFrameworks: ["FastAPI", "React", "LangChain", "Pinecone", "Next.js"]
    }
  },
  {
    id: "backend-cloud",
    title: "Backend Cloud Engineer",
    matchPercentage: 74,
    salaryRange: "$120,000 - $160,000",
    openings: "36,200+ Active Roles",
    difficulty: "Moderate",
    timeToReadiness: "10-14 Weeks",
    description: "Focus on cloud-native backend services, high-throughput microservices, database optimizations, and CI/CD pipelines.",
    requiredSkills: [
      { name: "Python", status: "Mastered", weight: "High" },
      { name: "SQL & Query Tuning", status: "Mastered", weight: "High" },
      { name: "Node.js Microservices", status: "Missing (High Priority)", weight: "High" },
      { name: "Docker & Containerization", status: "In Progress", weight: "High" },
      { name: "AWS / Cloud Infra", status: "Learning", weight: "Medium" },
      { name: "System Design", status: "Learning", weight: "High" }
    ],
    marketTrends: {
      yoyGrowth: "+14.7%",
      topHiringHubs: ["Chicago", "Austin", "Denver", "Remote"],
      coreFrameworks: ["Python", "FastAPI", "Docker", "PostgreSQL", "AWS"]
    }
  },
  {
    id: "frontend-architect",
    title: "Frontend UI/UX Specialist",
    matchPercentage: 35,
    salaryRange: "$110,000 - $145,000",
    openings: "29,400+ Active Roles",
    difficulty: "Challenging",
    timeToReadiness: "24-28 Weeks",
    description: "Specialize in cutting-edge responsive web apps, state architectures, accessible design systems, and micro-interactions.",
    requiredSkills: [
      { name: "HTML & Semantics", status: "Mastered", weight: "High" },
      { name: "Modern CSS / Tailwind", status: "Learning", weight: "High" },
      { name: "JavaScript Deep Dive", status: "Missing", weight: "High" },
      { name: "React & Next.js", status: "Missing", weight: "High" },
      { name: "TypeScript", status: "Missing", weight: "High" },
      { name: "Performance Profiling", status: "Missing", weight: "Medium" }
    ],
    marketTrends: {
      yoyGrowth: "+11.2%",
      topHiringHubs: ["Los Angeles", "New York", "Remote"],
      coreFrameworks: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"]
    }
  }
];

export const skillDnaData = {
  overallScore: 58,
  breakdown: [
    { category: "Algorithmic Logic (Python)", score: 86, benchmark: 75, status: "Strength", note: "Strong foundational scripting & data manipulation" },
    { category: "Database & Modeling (SQL)", score: 74, benchmark: 68, status: "Strength", note: "Solid query performance and schema knowledge" },
    { category: "Web Semantics & Markup (HTML)", score: 48, benchmark: 65, status: "Emerging", note: "Understands structure, needs modern a11y depth" },
    { category: "Client-side Scripting (JS)", score: 20, benchmark: 80, status: "Critical Gap", note: "Needs DOM API, closures, async/promises" },
    { category: "Component Frameworks (React)", score: 12, benchmark: 82, status: "Critical Gap", note: "Must build components, hooks & state architecture" },
    { category: "Server Runtime (Node.js)", score: 9, benchmark: 72, status: "Critical Gap", note: "Must master event loop, Express routing, middleware" },
    { category: "Version Control & Tooling", score: 68, benchmark: 70, status: "Stable", note: "Comfortable with Git branch workflows & PRs" }
  ],
  confidenceVsProficiency: [
    { skill: "Python", proficiency: 85, confidence: 90, quadrant: "Strength Zone" },
    { skill: "SQL Queries", proficiency: 72, confidence: 78, quadrant: "Strength Zone" },
    { skill: "Git / CI", proficiency: 65, confidence: 70, quadrant: "Competent Zone" },
    { skill: "HTML5", proficiency: 45, confidence: 55, quadrant: "Overconfidence Risk" },
    { skill: "Modern CSS", proficiency: 30, confidence: 35, quadrant: "Learning Zone" },
    { skill: "JavaScript", proficiency: 18, confidence: 24, quadrant: "Immediate Focus Zone" },
    { skill: "React.js", proficiency: 10, confidence: 15, quadrant: "High Growth Potential" },
    { skill: "Node.js", proficiency: 8, confidence: 12, quadrant: "High Growth Potential" }
  ],
  aiInsights: [
    {
      type: "Superpower",
      title: "Python-to-JS Transfer Advantage",
      text: "Because you already comprehend data structures, lambdas, and control flow in Python, mastering JavaScript syntactical equivalents will take 40% less time than for total beginners."
    },
    {
      type: "Bridge",
      title: "Full Stack DB Synergy",
      text: "Your SQL proficiency is a rare differentiator among junior full-stack applicants. Connecting Node.js/Express to PostgreSQL via Prisma or pg will immediately feel intuitive."
    },
    {
      type: "Risk",
      title: "Asynchronous JavaScript Pitfall",
      text: "JavaScript's single-threaded event loop and asynchronous promise chaining differs from synchronous Python script execution. Allocate dedicated practice to Event Loop mental models."
    }
  ]
};

export const roadmapPhases = [
  {
    phase: 1,
    title: "Phase 1: Modern JavaScript & DOM Architecture",
    duration: "Weeks 1 – 4",
    status: "In Progress",
    progress: 35,
    highlight: "Closing the primary syntax gap: from Python scripting to JS reactivity.",
    tasks: [
      { id: "t101", title: "ES6+ Fundamentals (Arrow functions, Destructuring, Spread, Rest)", completed: true, points: 50 },
      { id: "t102", title: "Modern DOM Manipulation & Browser Event Delegation", completed: true, points: 50 },
      { id: "t103", title: "Asynchronous JS: Event Loop, Promises, and Async/Await", completed: false, points: 75 },
      { id: "t104", title: "Fetch API & Consuming Public RESTful Endpoints", completed: false, points: 60 },
      { id: "t105", title: "Mini Project: Dynamic Currency & Stock Exchange Dashboard", completed: false, points: 100 }
    ],
    resources: [
      { id: "r1", title: "JavaScript: The Hard Parts & Event Loop Deep Dive", type: "Video Masterclass", duration: "4.5 hrs", rating: 4.9, difficulty: "Intermediate" },
      { id: "r2", title: "Modern JavaScript for Python Developers Guide", type: "Interactive Doc", duration: "2 hrs read", rating: 4.8, difficulty: "Tailored" },
      { id: "r3", title: "DOM & Asynchronous JS Practice Lab", type: "Coding Sandbox", duration: "8 exercises", rating: 5.0, difficulty: "Hands-on" }
    ]
  },
  {
    phase: 2,
    title: "Phase 2: React 19 Ecosystem & State Management",
    duration: "Weeks 5 – 9",
    status: "Up Next",
    progress: 0,
    highlight: "Component lifecycle, custom hooks, virtual DOM, and client data flows.",
    tasks: [
      { id: "t201", title: "JSX Syntax, Component Composition & Props Drilling Prevention", completed: false, points: 50 },
      { id: "t202", title: "Hooks Mastery: useState, useEffect, useMemo, useCallback, useRef", completed: false, points: 80 },
      { id: "t203", title: "Context API & Modern Global State (Zustand)", completed: false, points: 70 },
      { id: "t204", title: "Styling React: Tailwind CSS, CSS Modules & Glassmorphic UI", completed: false, points: 60 },
      { id: "t205", title: "Capstone Project: AI Prompt Engineering Studio Web App", completed: false, points: 150 }
    ],
    resources: [
      { id: "r4", title: "Epic React: Component Thinking from First Principles", type: "Interactive Course", duration: "12 hrs", rating: 4.9, difficulty: "Intermediate" },
      { id: "r5", title: "Building Clean Modern UIs with React 19", type: "Video Series", duration: "6 hrs", rating: 4.8, difficulty: "Hands-on" }
    ]
  },
  {
    phase: 3,
    title: "Phase 3: Node.js, Express & RESTful Services",
    duration: "Weeks 10 – 14",
    status: "Upcoming",
    progress: 0,
    highlight: "Server-side architecture, PostgreSQL integration, and secure JWT authentication.",
    tasks: [
      { id: "t301", title: "Node.js Core Modules, CommonJS vs ES Modules & NPM Ecosystem", completed: false, points: 50 },
      { id: "t302", title: "Express.js Server Architecture, Middleware & Routing", completed: false, points: 70 },
      { id: "t303", title: "PostgreSQL Database Integration with Prisma ORM / Knex", completed: false, points: 80 },
      { id: "t304", title: "Authentication: JWT tokens, Bcrypt password hashing & CORS", completed: false, points: 90 },
      { id: "t305", title: "Micro-API Project: User Authentication & Activity Telemetry Engine", completed: false, points: 130 }
    ],
    resources: [
      { id: "r6", title: "Production Backend Engineering with Node & PostgreSQL", type: "Workshop", duration: "8 hrs", rating: 4.9, difficulty: "Advanced" },
      { id: "r7", title: "Secure REST APIs: OWASP Top 10 Best Practices", type: "Documentation", duration: "3 hrs read", rating: 4.7, difficulty: "Critical" }
    ]
  },
  {
    phase: 4,
    title: "Phase 4: Full Stack Integration, Cloud & Career Launch",
    duration: "Weeks 15 – 20",
    status: "Upcoming",
    progress: 0,
    highlight: "Uniting frontend and backend, automated tests, deployment, and interview prep.",
    tasks: [
      { id: "t401", title: "Full Stack Monorepo / Multi-Tier Integration", completed: false, points: 75 },
      { id: "t402", title: "Dockerizing React & Node.js with Docker Compose", completed: false, points: 80 },
      { id: "t403", title: "CI/CD Deployment to Vercel & Railway / AWS ECS", completed: false, points: 70 },
      { id: "t404", title: "Flagship Portfolio Showcase: AI Career Architecture Platform", completed: false, points: 200 },
      { id: "t405", title: "Technical Mock Interview Simulator with Socratic AI Agent", completed: false, points: 100 }
    ],
    resources: [
      { id: "r8", title: "Full Stack System Design & Interview Blueprint", type: "Comprehensive Guide", duration: "10 hrs", rating: 5.0, difficulty: "Career Launch" }
    ]
  }
];

export const assessmentQuizzes = [
  {
    id: "quiz-js",
    title: "JavaScript Core & Event Loop Diagnostic",
    category: "Missing Skill Diagnostic",
    level: "Intermediate",
    timeMinutes: 10,
    completed: true,
    score: 80,
    totalQuestions: 5,
    badgeAwarded: "JS Syntax Apprentice",
    questions: [
      {
        id: 1,
        question: "What is the output of the following JavaScript code snippet?",
        codeSnippet: `console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);`,
        options: [
          "1, 2, 3, 4",
          "1, 4, 3, 2",
          "1, 4, 2, 3",
          "1, 3, 4, 2"
        ],
        correctIndex: 1,
        userSelected: 1,
        explanation: "Synchronous code runs first (1, 4). Microtasks from Promise callbacks execute next before macrotasks (3). Finally, the macrotask setTimeout callback runs (2)."
      },
      {
        id: 2,
        question: "How does 'const' behave when assigned to an object in JavaScript?",
        codeSnippet: `const user = { name: 'Alex' };\nuser.name = 'Jordan'; // Line A\nuser = { name: 'Taylor' }; // Line B`,
        options: [
          "Both Line A and Line B fail with TypeError",
          "Line A succeeds, but Line B throws TypeError",
          "Both Line A and Line B succeed silently",
          "Line A throws TypeError, Line B succeeds"
        ],
        correctIndex: 1,
        userSelected: 1,
        explanation: "const creates an immutable binding to the memory reference, not an immutable value. You can mutate object properties, but reassigning the identifier throws TypeError."
      },
      {
        id: 3,
        question: "Which array method creates a new array with elements that pass a boolean test, without mutating the original?",
        options: [
          "Array.prototype.map()",
          "Array.prototype.filter()",
          "Array.prototype.splice()",
          "Array.prototype.forEach()"
        ],
        correctIndex: 1,
        userSelected: 1,
        explanation: "filter() returns a fresh shallow copy of the portions of the given array filtered down to just the elements that pass the predicate function."
      },
      {
        id: 4,
        question: "In comparing Python dictionaries to JavaScript objects, which statement is TRUE regarding property keys?",
        options: [
          "Both require string keys only",
          "Python dict keys can be any hashable type (tuples, ints), while standard JS object keys are coerced to strings or symbols",
          "JavaScript objects allow unquoted tuples as keys",
          "Neither allows integer keys"
        ],
        correctIndex: 1,
        userSelected: 1,
        explanation: "In JavaScript standard objects, non-symbol property keys are converted to strings. Python dicts can use any hashable object (numbers, strings, tuples)."
      },
      {
        id: 5,
        question: "What does the 'async' keyword in front of a JavaScript function declaration guarantee?",
        codeSnippet: `async function compute() {\n  return 42;\n}`,
        options: [
          "The function runs on a separate OS background thread",
          "The function always returns a Promise resolving to the returned value",
          "The function will block the UI until calculation completes",
          "The function executes strictly synchronously"
        ],
        correctIndex: 1,
        userSelected: 0,
        explanation: "An async function always wraps its return value in a Promise (e.g. Promise.resolve(42)). It does NOT spawn a separate thread, as JS is single-threaded."
      }
    ]
  },
  {
    id: "quiz-react",
    title: "React 19 Hooks & Rendering Mechanics",
    category: "Framework Readiness",
    level: "Beginner-Intermediate",
    timeMinutes: 8,
    completed: false,
    score: null,
    totalQuestions: 4,
    badgeAwarded: "React Blueprint Initiate",
    questions: [
      {
        id: 101,
        question: "Why should you never call React Hooks inside regular loops, conditions, or nested functions?",
        options: [
          "Because JavaScript will run out of call stack memory",
          "Because React relies on call order to preserve hook state across renders",
          "Because it breaks JSX compiler transpilation",
          "Because loops in JavaScript are deprecated in React 19"
        ],
        correctIndex: 1,
        userSelected: null,
        explanation: "React relies on the call order of hooks remaining strictly identical between renders to map each useState or useEffect to its corresponding internal fiber slot."
      },
      {
        id: 102,
        question: "When should you provide a dependency array to 'useEffect(callback, [deps])'?",
        options: [
          "Only when using TypeScript",
          "To control when the side-effect re-runs based on shallow equality comparisons of deps",
          "Only when fetching data from an external API",
          "Never, modern React automatically knows all dependencies"
        ],
        correctIndex: 1,
        userSelected: null,
        explanation: "The dependency array tells React to re-run the effect callback only if at least one dependency has changed by shallow comparison (Object.is) since the previous render."
      },
      {
        id: 103,
        question: "What is the primary benefit of the 'key' prop when rendering dynamic lists in React?",
        codeSnippet: `items.map(item => <Card key={item.id} data={item} />)`,
        options: [
          "It adds CSS styling to list nodes",
          "It helps React uniquely identify elements to optimize reconciliation and DOM diffing",
          "It secures the element against Cross-Site Scripting (XSS)",
          "It converts the items to immutable state"
        ],
        correctIndex: 1,
        userSelected: null,
        explanation: "Keys provide identity to React's reconciliation algorithm, allowing it to determine which items have been added, removed, or reordered without tearing down DOM subtrees."
      },
      {
        id: 104,
        question: "How does state lifting solve data sharing between two sibling components in React?",
        options: [
          "By storing the state directly in window.localStorage",
          "By moving the shared state up to their closest common ancestor and passing it down via props",
          "By converting both siblings into class components",
          "By creating an invisible iframe"
        ],
        correctIndex: 1,
        userSelected: null,
        explanation: "State lifting moves the state up to the closest common parent component, which then passes the value and updater callbacks down to both siblings via props."
      }
    ]
  },
  {
    id: "quiz-node",
    title: "Node.js & Backend Architecture Check",
    category: "Full Stack Mastery",
    level: "Intermediate",
    timeMinutes: 8,
    completed: false,
    score: null,
    totalQuestions: 3,
    badgeAwarded: "Backend Artisan",
    questions: [
      {
        id: 201,
        question: "What role does the 'next' parameter play in Express.js middleware functions?",
        codeSnippet: `app.use((req, res, next) => {\n  // middleware logic\n  next();\n});`,
        options: [
          "It redirects the client browser to the next URL route",
          "It passes control to the next middleware or route handler in the execution pipeline",
          "It terminates the Node.js server process safely",
          "It creates a new database connection thread"
        ],
        correctIndex: 1,
        userSelected: null,
        explanation: "Calling next() tells Express to invoke the subsequent middleware function in the stack. Omitting it will leave the request hanging until a client timeout occurs."
      },
      {
        id: 202,
        question: "Why should password hashes never be computed using standard fast cryptographic hashes like MD5 or SHA256?",
        options: [
          "Because they do not support UTF-8 characters",
          "Because fast hashes allow attackers to brute-force billions of hashes per second; slow hashes like bcrypt with work factors are required",
          "Because MD5 is prohibited by browsers",
          "Because Node.js cannot compute SHA256"
        ],
        correctIndex: 1,
        userSelected: null,
        explanation: "MD5 and SHA256 are designed for speed. For password security, adaptive key-stretching algorithms like bcrypt or argon2 must be used to resist GPU/ASIC brute force attacks."
      },
      {
        id: 203,
        question: "How does connecting your existing SQL database experience benefit Express API development?",
        options: [
          "Express requires zero database drivers",
          "Understanding normalized joins and indexing allows writing efficient ORM / raw SQL queries that prevent N+1 query bottlenecks in API endpoints",
          "SQL replaces JavaScript completely on the server",
          "There is no benefit"
        ],
        correctIndex: 1,
        userSelected: null,
        explanation: "Strong SQL intuition prevents common backend traps like the N+1 query problem, poor indexing, and unoptimized transactions when building REST endpoints."
      }
    ]
  }
];

export const aiAgents = [
  {
    id: "archie",
    name: "Archie",
    role: "Lead Career Architect & Strategist",
    avatar: "Compass",
    color: "#8b5cf6",
    badge: "Strategic Core",
    status: "Active Monitoring",
    currentTask: "Synthesizing 6-month Full Stack milestone trajectory for Alex.",
    metrics: { accuracy: "99.4%", suggestionsGiven: 48, impactScore: "9.6/10" },
    dialogue: "Alex's Python and SQL base is in the top 20% of entrants. The shortest path to $120k+ is treating JavaScript as a runtime sibling to Python rather than starting from scratch.",
    recentActions: [
      { time: "10 mins ago", action: "Recalculated career readiness score to 58% (+4% this week)" },
      { time: "2 hrs ago", action: "Flagged Node.js Express module as top priority for next sprint" }
    ]
  },
  {
    id: "codex",
    name: "Codex",
    role: "Curriculum & Code Review Agent",
    avatar: "Terminal",
    color: "#3b82f6",
    badge: "Technical Evaluator",
    status: "Analyzing Codebase",
    currentTask: "Evaluating Alex's Python ETL pipeline repository code quality.",
    metrics: { testsRun: 142, codeAudits: 31, bugsCaught: 18 },
    dialogue: "Reviewed 'financial-etl-pipeline'. SQLAlchemy connection pooling is clean. Recommended next step: translate the Python data consumer into a Node.js streaming listener to solidify asynchronous concepts.",
    recentActions: [
      { time: "25 mins ago", action: "Verified SQL project evidence with 94/100 code quality badge" },
      { time: "1 day ago", action: "Generated 5 tailored diagnostic questions on JavaScript Event Loop" }
    ]
  },
  {
    id: "scout",
    name: "Scout",
    role: "Live Market Intelligence Agent",
    avatar: "Radar",
    color: "#10b981",
    badge: "Labor Market Feed",
    status: "Live Web & Job Sync",
    currentTask: "Scraping 12,400+ remote Full Stack postings from top tech employers.",
    metrics: { jobPostingsParsed: "42.8k", wageConfidence: "98%", trendLatency: "< 5s" },
    dialogue: "High alert: React 19 and Next.js demand in remote startups grew +28% this quarter. Full Stack roles pairing Python backend with React frontend command a $14,000 median salary premium.",
    recentActions: [
      { time: "4 mins ago", action: "Indexed 182 new remote junior-to-mid Full Stack roles matching Alex's stack" },
      { time: "3 hrs ago", action: "Updated median salary estimate to $128,500 based on Q4 hiring feeds" }
    ]
  },
  {
    id: "socrates",
    name: "Socrates",
    role: "Socratic Interview & Mindset Mentor",
    avatar: "Sparkles",
    color: "#ec4899",
    badge: "Behavioral & Tech Coach",
    status: "Ready for Mock Sessions",
    currentTask: "Preparing conversational drills on asynchronous event loops and data normalization.",
    metrics: { drillsSimulated: 89, confidenceBoost: "+34%", feedbackClarity: "9.8/10" },
    dialogue: "Remember Alex: imposter syndrome strikes when moving between languages. Syntax is ephemeral; computational problem solving is permanent. You already have the hardest part down.",
    recentActions: [
      { time: "1 hr ago", action: "Pushed 3 encouragement flashcards to Alex's dashboard" },
      { time: "4 hrs ago", action: "Recorded mock interview score on database indexing fundamentals" }
    ]
  }
];

export const agentRoomLogs = [
  { id: 1, sender: "Archie", time: "10:14 AM", text: "Initiating weekly curriculum optimization for student Alex Rivera. Target role: Full Stack Developer." },
  { id: 2, sender: "Scout", time: "10:14 AM", text: "Market data verified: 84% of entry Full Stack requisitions mandate React component state proficiency. Recommend prioritizing Phase 2." },
  { id: 3, sender: "Codex", time: "10:15 AM", text: "Agreed. Alex completed the ES6 diagnostic with 80%. Asynchronous Promise chaining remains the only blocker before React." },
  { id: 4, sender: "Socrates", time: "10:15 AM", text: "Alex's study streak is at 14 days. Confidence metrics show positive momentum. Let's deliver the Promise visualizer lab next." },
  { id: 5, sender: "Archie", time: "10:16 AM", text: "Consensus reached. Learning path updated. Notifying student dashboard with high-priority next action." }
];

export const timeMachineScenarios = [
  {
    id: "fullstack-fast",
    name: "Path A: Modern Full Stack Specialist (Recommended)",
    subtitle: "React 19 + Node.js + Python APIs",
    durationMonths: 6,
    targetSalary: "$125,000",
    effortHoursPerWeek: 18,
    placementRate: "89%",
    difficulty: "Balanced",
    summary: "Leverage existing Python/SQL strengths while building frontend mastery with modern React, JavaScript, and Node microservices.",
    milestones: [
      { period: "Month 2", title: "JavaScript ES6+ & Async Fluency", readiness: "68%", salaryEst: "$85k base" },
      { period: "Month 4", title: "React State & Full Stack REST Mini-Apps", readiness: "82%", salaryEst: "$105k base" },
      { period: "Month 6", title: "Full Production Portfolio & Interview Ready", readiness: "95%", salaryEst: "$125k base" },
      { period: "Year 2", title: "Senior Full Stack Engineer / Tech Lead", readiness: "100%", salaryEst: "$165k+ base" }
    ],
    pros: ["Highest sheer volume of job openings", "Seamless transition using Python backend bridges", "Fastest path to marketable production portfolio"],
    cons: ["Requires rapid adaptation to JavaScript async event loop", "Frontend ecosystem moves quickly"]
  },
  {
    id: "ai-engineer",
    name: "Path B: AI-Powered Full Stack Architect",
    subtitle: "Python + React + LangChain + Vector DBs",
    durationMonths: 8,
    targetSalary: "$145,000",
    effortHoursPerWeek: 22,
    placementRate: "84%",
    difficulty: "Intensive",
    summary: "Double down on Python for AI model orchestration and build interactive React interfaces with agentic workflows.",
    milestones: [
      { period: "Month 2", title: "FastAPI & Vector Search (Pinecone/Chroma)", readiness: "72%", salaryEst: "$95k base" },
      { period: "Month 5", title: "React UIs for Generative AI & Streaming", readiness: "84%", salaryEst: "$120k base" },
      { period: "Month 8", title: "Production AI SaaS Application Live", readiness: "94%", salaryEst: "$145k base" },
      { period: "Year 2", title: "Principal AI Application Engineer", readiness: "100%", salaryEst: "$190k+ base" }
    ],
    pros: ["Top-tier compensation bracket", "Explosive industry demand in 2026", "Capitalizes heavily on your 85% Python background"],
    cons: ["Higher math & architecture complexity", "Requires 4 extra hours per week"]
  },
  {
    id: "backend-cloud",
    name: "Path C: Enterprise Cloud & Backend Engineer",
    subtitle: "Python + PostgreSQL + Docker + AWS",
    durationMonths: 5,
    targetSalary: "$118,000",
    effortHoursPerWeek: 15,
    placementRate: "91%",
    difficulty: "Direct",
    summary: "Bypass frontend complexity almost entirely; focus on cloud infrastructure, high-concurrency microservices, and databases.",
    milestones: [
      { period: "Month 2", title: "Docker & Microservices Architecture", readiness: "78%", salaryEst: "$90k base" },
      { period: "Month 4", title: "AWS Cloud Infrastructure & CI/CD", readiness: "88%", salaryEst: "$110k base" },
      { period: "Month 5", title: "High-scale API Benchmarking & Security", readiness: "93%", salaryEst: "$118k base" },
      { period: "Year 2", title: "Staff Backend / Cloud Architect", readiness: "100%", salaryEst: "$158k+ base" }
    ],
    pros: ["Shortest time-to-readiness (5 months)", "Maximum utilization of existing Python & SQL depth", "Lowest frontend UI maintenance overhead"],
    cons: ["Fewer flashy visual portfolio items to showcase", "Slightly lower salary ceiling than AI Full Stack"]
  }
];

export const mentorChatHistory = [
  {
    id: "m1",
    sender: "ai",
    agent: "Archie",
    timestamp: "10:00 AM",
    text: "Good morning Alex! I've analyzed your progress. You've held a 14-day streak, and your SQL and Python foundations are stellar. We have 3 critical skills to unlock for your Full Stack Developer target: **JavaScript**, **React**, and **Node.js**.\n\nWhat would you like to tackle today?"
  },
  {
    id: "m2",
    sender: "user",
    timestamp: "10:02 AM",
    text: "I feel a bit intimidated jumping from synchronous Python scripts to JavaScript's asynchronous promises and event loop. How should I think about it?"
  },
  {
    id: "m3",
    sender: "ai",
    agent: "Archie",
    timestamp: "10:02 AM",
    text: "That is completely normal! In Python, code waits line-by-line unless you use `asyncio` or threading. In JavaScript, the browser or Node engine cannot afford to freeze while waiting for network requests.\n\nThink of a restaurant kitchen: synchronous Python is a single chef who cooks one dish from start to finish before touching the next order. JavaScript is a chef who puts a cake in the oven (macrotask), sets a timer, and immediately preps the next salad while the oven does the waiting.\n\nWhen the oven rings, it goes to the Callback Queue and executes as soon as the cutting board is clear!\n\nWould you like to try a 3-line mental exercise comparing Python's `async def` with JS `async/await`?"
  }
];

export const skillPassportData = {
  passportId: "SKP-2026-ALEX-9842",
  issueDate: "November 2026",
  validThrough: "Perpetual AI Verified",
  verificationHash: "0x8F94...B7E1-SHA256-VERIFIED",
  trustScore: "98.7%",
  student: {
    name: "Alex Rivera",
    targetRole: "Full Stack Developer",
    status: "Active Verified Candidate"
  },
  verifiedBadges: [
    { id: "b1", title: "Python Advanced Core", issuer: "SkillPilot AI Engine", date: "Nov 2026", icon: "Code2", score: "85/100", verified: true, color: "#8b5cf6" },
    { id: "b2", title: "SQL Relational Architect", issuer: "SkillPilot AI Engine", date: "Nov 2026", icon: "Database", score: "72/100", verified: true, color: "#3b82f6" },
    { id: "b3", title: "Git Collaboration & Flow", issuer: "SkillPilot AI Engine", date: "Nov 2026", icon: "GitBranch", score: "68/100", verified: true, color: "#10b981" },
    { id: "b4", title: "Web Semantics & DOM", issuer: "SkillPilot AI Engine", date: "Nov 2026", icon: "Layout", score: "45/100", verified: true, color: "#f59e0b" },
    { id: "b5", title: "14-Day Consistent Study Streak", issuer: "SkillPilot Community", date: "Nov 2026", icon: "Zap", score: "100%", verified: true, color: "#ec4899" }
  ],
  demonstratedEvidence: [
    {
      id: "ev1",
      title: "Automated Financial Data Pipeline",
      type: "Production Repository",
      skillsValidated: ["Python 3.12", "Pandas", "PostgreSQL", "ETL Architecture"],
      stars: 38,
      codeHash: "git:8fa32b...verified",
      verificationNote: "Automated test suite passed 18/18 integration tests. Zero SQL injection vulnerabilities detected."
    },
    {
      id: "ev2",
      title: "PostgreSQL Advanced Analytical Query Suite",
      type: "Query Portfolio",
      skillsValidated: ["SQL", "Recursive CTEs", "Partitioning", "Execution Plans"],
      stars: 19,
      codeHash: "git:3c99f1...verified",
      verificationNote: "Query benchmarks confirmed 42% query execution speedup via index optimization."
    }
  ]
};
