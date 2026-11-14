// ==========================================================================
// SKILLPILOT AI — 4 Five-Question MCQ Assessments with Topic Tags
// ==========================================================================

export const SMART_ASSESSMENTS = [
  {
    id: "quiz-js",
    title: "JavaScript Core & Asynchronous Runtime Diagnostic",
    category: "Frontend & Runtime",
    skillId: "javascript",
    level: "Intermediate",
    timeMinutes: 8,
    totalQuestions: 5,
    badgeAwarded: "JS Verified Specialist",
    questions: [
      {
        id: 1,
        question: "What is the exact execution order of the console logs in this snippet?",
        codeSnippet: `console.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');`,
        options: [
          "A, B, C, D",
          "A, D, C, B",
          "A, D, B, C",
          "A, C, D, B"
        ],
        correctIndex: 1,
        topicTag: "Event Loop & Microtasks",
        explanation: "Synchronous statements ('A', 'D') run first on the call stack. The Promise resolution enters the Microtask queue, executing before macrotasks ('C'). Finally, the setTimeout callback in the Macrotask/Task queue runs ('B')."
      },
      {
        id: 2,
        question: "What will the following closure output when invoked?",
        codeSnippet: `function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c1 = createCounter();\nconst c2 = createCounter();\nc1(); c1();\nconsole.log(c1(), c2());`,
        options: [
          "3, 1",
          "2, 1",
          "3, 3",
          "2, 0"
        ],
        correctIndex: 0,
        topicTag: "Closures & Scope",
        explanation: "Each invocation of createCounter creates a separate lexical environment. c1 maintains its own count variable (incremented 3 times -> 3), while c2 has its independent count (incremented once -> 1)."
      },
      {
        id: 3,
        question: "How does the 'this' keyword behave inside an arrow function compared to a standard function declaration?",
        options: [
          "Arrow functions bind 'this' to the element invoking the function at runtime",
          "Arrow functions lexically retain 'this' from their enclosing lexical context without their own binding",
          "Arrow functions always bind 'this' to window or globalThis in strict mode",
          "Arrow functions can be rebound dynamically using Function.prototype.bind()"
        ],
        correctIndex: 1,
        topicTag: "Arrow Functions & Lexical This",
        explanation: "Arrow functions do not have their own 'this' binding or prototype. Instead, they inherit 'this' lexically from the scope in which they were defined."
      },
      {
        id: 4,
        question: "What will occur when attempting to mutate an object assigned with 'const' and frozen with Object.freeze()?",
        codeSnippet: `'use strict';\nconst config = { api: 'v1' };\nObject.freeze(config);\nconfig.api = 'v2';`,
        options: [
          "The object is mutated silently to { api: 'v2' }",
          "In strict mode, a TypeError is thrown; outside strict mode, the mutation fails silently",
          "The 'const' identifier throws a ReferenceError",
          "Object.freeze() converts the object into a Map"
        ],
        correctIndex: 1,
        topicTag: "Object Immutability & Strict Mode",
        explanation: "Object.freeze creates a shallow-immutable object. In strict mode, modifying a non-writable frozen property throws a TypeError. Outside strict mode, it fails silently."
      },
      {
        id: 5,
        question: "What does Promise.all() do when one of the passed promises rejects?",
        options: [
          "It waits for all other promises to resolve and ignores the rejection",
          "It rejects immediately with the reason of the first promise that rejects (fail-fast)",
          "It returns an array containing both errors and resolved values",
          "It retries the rejected promise up to 3 times"
        ],
        correctIndex: 1,
        topicTag: "Promises & Async Concurrency",
        explanation: "Promise.all has fail-fast behavior: if any passed promise rejects, the returned promise immediately rejects with that rejection reason. (Promise.allSettled is used to wait for all results regardless of rejection)."
      }
    ]
  },
  {
    id: "quiz-react",
    title: "React 19 Component & State Lifecycle Diagnostic",
    category: "Frontend Architecture",
    skillId: "react",
    level: "Intermediate",
    timeMinutes: 8,
    totalQuestions: 5,
    badgeAwarded: "React Verified Specialist",
    questions: [
      {
        id: 101,
        question: "Why must React Hook calls never be placed inside conditionals or nested loops?",
        options: [
          "Because JavaScript garbage collection fails on conditional closures",
          "Because React relies on call order to pair state variables to component fibers across renders",
          "Because JSX compilers cannot transpile conditional expressions",
          "Because hooks require synchronous recursion"
        ],
        correctIndex: 1,
        topicTag: "Hooks Rules & Fiber Architecture",
        explanation: "React relies on the call order of hooks remaining strictly deterministic across every render. Conditionals disrupt the pointer index in the fiber's memoizedState linked list."
      },
      {
        id: 102,
        question: "What is the primary danger of omitting a referenced variable from a useEffect dependency array?",
        options: [
          "The component will throw an unhandled syntax error during bundling",
          "The effect callback captures stale closures of that variable from earlier renders",
          "React will automatically unmount the component DOM tree",
          "Network requests in the effect will be converted to synchronous requests"
        ],
        correctIndex: 1,
        topicTag: "useEffect & Stale Closures",
        explanation: "Omitting dependencies causes the effect to reference captured values from the render in which it was created, leading to stale closures and subtle synchronization bugs."
      },
      {
        id: 103,
        question: "What is the exact purpose of the 'key' attribute when mapping over a list of elements?",
        codeSnippet: `users.map(u => <UserCard key={u.id} user={u} />)`,
        options: [
          "It provides a CSS selector for stylesheet specificity",
          "It helps React reconciliation identify which items have changed, added, or removed without re-rendering the whole list",
          "It prevents Cross-Site Scripting (XSS) attacks in HTML attributes",
          "It converts the child element into a controlled form component"
        ],
        correctIndex: 1,
        topicTag: "Reconciliation & Keys",
        explanation: "Keys give stable identity to elements across renders. React diffing uses keys to match existing DOM nodes, preventing expensive unmounts and element state swaps."
      },
      {
        id: 104,
        question: "When should you reach for useMemo() instead of standard local computation?",
        options: [
          "For every single variable declared inside any React component",
          "Only for expensive calculations (e.g. large array filtering/sorting) where reference equality or computation cost matters",
          "To trigger re-renders whenever child props mutate",
          "To perform asynchronous network fetch requests"
        ],
        correctIndex: 1,
        topicTag: "Performance & useMemo",
        explanation: "useMemo adds memory overhead to cache values. It is meant for computationally heavy calculations or preserving reference identity for memoized children (React.memo)."
      },
      {
        id: 105,
        question: "How does React state batching behave in React 18/19 during asynchronous event handlers (e.g. inside setTimeout or fetch)?",
        codeSnippet: `setTimeout(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n}, 100);`,
        options: [
          "It causes two separate re-renders, one for each state setter",
          "It automatically batches both updates into a single re-render",
          "It throws an invariant error unless wrapped in ReactDOM.flushSync()",
          "It ignores the second state update"
        ],
        correctIndex: 1,
        topicTag: "Automatic State Batching",
        explanation: "React 18 and 19 feature Automatic Batching across all contexts, including promises, timeouts, and native event handlers, grouping state setters into a single re-render."
      }
    ]
  },
  {
    id: "quiz-python",
    title: "Python Core, Data Structures & Automation Diagnostic",
    category: "Backend & Data",
    skillId: "python",
    level: "Intermediate",
    timeMinutes: 8,
    totalQuestions: 5,
    badgeAwarded: "Python Verified Specialist",
    questions: [
      {
        id: 201,
        question: "What is the outcome of the following mutable default parameter trap in Python?",
        codeSnippet: `def append_item(val, items=[]):\n    items.append(val)\n    return items\n\nprint(append_item(1))\nprint(append_item(2))`,
        options: [
          "[1] and [2]",
          "[1] and [1, 2]",
          "[1, 2] and [1, 2]",
          "TypeError: mutable default not allowed"
        ],
        correctIndex: 1,
        topicTag: "Default Parameters & Mutability",
        explanation: "Default parameter expressions in Python are evaluated once when the function is defined, not upon each call. The same list object in memory is reused across subsequent invocations."
      },
      {
        id: 202,
        question: "What is the primary difference between a Python list comprehension and a generator expression?",
        codeSnippet: `l = [x**2 for x in range(1000000)]\ng = (x**2 for x in range(1000000))`,
        options: [
          "List comprehension produces a tuple; generator produces a set",
          "List comprehension evaluates in memory all at once; generator yields values lazily on demand with O(1) memory",
          "Generators run on a separate CPU thread automatically",
          "There is no difference; parentheses are syntactic sugar for lists"
        ],
        correctIndex: 1,
        topicTag: "Generators & Memory Efficiency",
        explanation: "A generator expression returns a generator object that produces items lazily via iterator protocol (__next__), requiring O(1) memory regardless of sequence size."
      },
      {
        id: 203,
        question: "In Python dictionaries, what requirement must an object satisfy to be used as a dictionary key?",
        options: [
          "It must be an instance of str or int only",
          "It must be hashable (__hash__) and support equality comparison (__eq__)",
          "It must be serializable to JSON",
          "It must inherit from collections.abc.Mapping"
        ],
        correctIndex: 1,
        topicTag: "Dictionaries & Hashability",
        explanation: "Any object that is hashable (has a hash value that remains constant during its lifetime and can be compared with __eq__) can be a dict key. Tuples of immutable objects qualify; lists do not."
      },
      {
        id: 204,
        question: "What does the '@functools.wraps(fn)' decorator do when authoring custom decorators?",
        codeSnippet: `import functools\ndef my_decorator(fn):\n    @functools.wraps(fn)\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs)\n    return wrapper`,
        options: [
          "It automatically compiles the wrapper function with Cython",
          "It preserves the original function's metadata (__name__, __doc__, annotations)",
          "It prevents the function from raising exceptions",
          "It forces the decorator to execute asynchronously"
        ],
        topicTag: "Decorators & Metadata",
        correctIndex: 1,
        explanation: "Without @functools.wraps, the decorated function takes on the name and docstring of 'wrapper'. wraps copies the original function's __name__, __doc__, and other introspective attributes."
      },
      {
        id: 205,
        question: "How does the Global Interpreter Lock (GIL) in standard CPython affect multi-threading?",
        options: [
          "It prevents threads from performing non-blocking network I/O",
          "It ensures only one thread executes Python bytecode at a time, limiting CPU-bound speedup across multiple cores",
          "It disables threading entirely on multi-core architectures",
          "It converts all multi-threaded scripts into asynchronous coroutines"
        ],
        correctIndex: 1,
        topicTag: "Concurrency & GIL",
        explanation: "The CPython GIL is a mutex preventing multiple native threads from executing Python bytecodes simultaneously. It allows concurrent I/O, but CPU-bound tasks require multiprocessing to leverage multiple cores."
      }
    ]
  },
  {
    id: "quiz-sql",
    title: "SQL Relational Modeling, Window Functions & Optimization",
    category: "Database & Modeling",
    skillId: "sql",
    level: "Intermediate",
    timeMinutes: 8,
    totalQuestions: 5,
    badgeAwarded: "SQL Verified Specialist",
    questions: [
      {
        id: 301,
        question: "What is the difference between RANK() and DENSE_RANK() in a SQL window function query?",
        options: [
          "RANK() requires an ORDER BY clause; DENSE_RANK() cannot use ORDER BY",
          "RANK() leaves gaps in ranking numbers after ties; DENSE_RANK() assigns consecutive numbers without gaps",
          "RANK() works only on integers; DENSE_RANK() works on text fields",
          "DENSE_RANK() partitions rows into buckets; RANK() does not"
        ],
        correctIndex: 1,
        topicTag: "Window Functions",
        explanation: "For tied values (e.g. two rows tied for 1st place), RANK() assigns (1, 1, 3), leaving a gap. DENSE_RANK() assigns (1, 1, 2) consecutively without skipping numbers."
      },
      {
        id: 302,
        question: "When should you use a HAVING clause instead of a WHERE clause in a SQL query?",
        options: [
          "HAVING filters individual rows before grouping; WHERE filters aggregated results",
          "HAVING filters aggregated groups based on aggregate functions (e.g. COUNT, SUM); WHERE filters individual rows prior to grouping",
          "HAVING can only be used with PostgreSQL dialects",
          "WHERE and HAVING are completely interchangeable in SQL standards"
        ],
        correctIndex: 1,
        topicTag: "Aggregation & Grouping",
        explanation: "WHERE filters table rows before aggregation occurs. HAVING is evaluated after the GROUP BY step and can filter based on aggregate function computations (e.g. HAVING COUNT(*) > 5)."
      },
      {
        id: 303,
        question: "Why might a B-Tree index on a column NOT be utilized by the query planner in this query?",
        codeSnippet: `SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2026;`,
        options: [
          "Because 2026 is an integer",
          "Because wrapping the indexed column inside a function prevents direct B-tree range seek without a functional/expression index",
          "Because orders tables cannot index dates",
          "Because SELECT * disables index usage"
        ],
        correctIndex: 1,
        topicTag: "Indexing & Query Optimization",
        explanation: "Standard B-Tree indexes search for exact or range values of the column. Wrapping the column in an expression/function (EXTRACT) invalidates normal seeks unless an expression index exists (or rewrites to range between '2026-01-01' and '2026-12-31')."
      },
      {
        id: 304,
        question: "What is the key benefit of a Common Table Expression (CTE) defined with 'WITH RECURSIVE'?",
        options: [
          "It forces the query to execute in parallel across multiple CPU nodes",
          "It enables querying hierarchical and graph data structures like org charts, category trees, and bill of materials",
          "It caches the result table on physical disk permanently",
          "It automatically encrypts the resulting table rows"
        ],
        correctIndex: 1,
        topicTag: "CTEs & Recursive Queries",
        explanation: "WITH RECURSIVE allows a query to refer to its own output, which is essential for traversing parent-child hierarchies, networks, and graphs until an anchor termination condition."
      },
      {
        id: 305,
        question: "What transaction isolation level prevents 'Non-Repeatable Reads' in the SQL standard?",
        options: [
          "Read Uncommitted",
          "Read Committed",
          "Repeatable Read",
          "No isolation level can prevent it"
        ],
        correctIndex: 2,
        topicTag: "Transactions & ACID Isolation",
        explanation: "Under 'Repeatable Read' (and 'Serializable'), a transaction re-reading rows will see the exact same values as its initial read, preventing non-repeatable read anomalies from concurrent committed transactions."
      }
    ]
  }
];
