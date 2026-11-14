from typing import Dict, Any, List

def normalize_skill_id(name: str) -> str:
    clean = (name or "").lower().strip()
    clean = clean.replace(" (es6+)", "").replace(" (postgresql / sqlite)", "").replace(" (postgresql)", "")
    clean = clean.replace("19 & component architecture", "").replace(" & express rest apis", "")
    clean = clean.replace(" & version control", "").replace("5 / semantic web", "").replace("3 / modern flexbox", "")
    clean = clean.replace(" (pandas & numpy)", "").replace(" & analytical querying", "").replace(" & bi", "")
    clean = clean.replace(" & probability", "").replace(" & scikit-learn", "").replace(" & pytorch", "")
    clean = clean.replace(" & express", "").replace(" & databases", "").replace(" & web semantics", "")
    clean = clean.strip()
    if "javascript" in clean or "es6" in clean or "js" in clean:
        return "javascript"
    if "react" in clean:
        return "react"
    if "node" in clean:
        return "nodejs"
    if "python" in clean or "pandas" in clean or "numpy" in clean:
        return "python"
    if "sql" in clean or "postgres" in clean:
        return "sql"
    if "html" in clean:
        return "html"
    if "css" in clean:
        return "css"
    if "git" in clean:
        return "git"
    if "tableau" in clean or "powerbi" in clean or "dataviz" in clean or "bi" in clean:
        return "dataviz"
    if "stat" in clean or "probab" in clean:
        return "statistics"
    if "excel" in clean:
        return "excel"
    if "scikit" in clean or "machine learning" in clean or clean == "ml":
        return "ml-core"
    if "pytorch" in clean or "deep learning" in clean or "neural" in clean or clean == "dl":
        return "deep-learning"
    if "vector" in clean or "rag" in clean or "pinecone" in clean or "chroma" in clean:
        return "vector-rag"
    if "algebra" in clean or "calculus" in clean or "math" in clean:
        return "math-linear-algebra"
    if "deploy" in clean or "fastapi" in clean or "docker" in clean:
        return "model-deployment"
    return clean

CAREER_REQUIREMENTS: Dict[str, Dict[str, Any]] = {
    "fullstack": {
        "id": "fullstack",
        "title": "Full Stack Developer",
        "category": "Software Engineering",
        "requiredSkills": [
            {"id": "javascript", "name": "JavaScript (ES6+)", "minProficiency": 80, "weight": 3},
            {"id": "react", "name": "React Ecosystem", "minProficiency": 80, "weight": 3},
            {"id": "nodejs", "name": "Node.js & Express", "minProficiency": 75, "weight": 3},
            {"id": "python", "name": "Python", "minProficiency": 70, "weight": 2},
            {"id": "sql", "name": "SQL & Databases", "minProficiency": 70, "weight": 2},
            {"id": "html", "name": "HTML5 & Web Semantics", "minProficiency": 65, "weight": 2},
            {"id": "css", "name": "Modern CSS", "minProficiency": 60, "weight": 1},
            {"id": "git", "name": "Git & Version Control", "minProficiency": 65, "weight": 1}
        ]
    },
    "data-analyst": {
        "id": "data-analyst",
        "title": "Data Analyst",
        "category": "Data & Business Intelligence",
        "requiredSkills": [
            {"id": "sql", "name": "SQL & Analytical Querying", "minProficiency": 85, "weight": 3},
            {"id": "python", "name": "Python (Pandas & NumPy)", "minProficiency": 75, "weight": 3},
            {"id": "dataviz", "name": "Data Visualization & BI", "minProficiency": 75, "weight": 3},
            {"id": "statistics", "name": "Statistics & Probability", "minProficiency": 70, "weight": 2},
            {"id": "excel", "name": "Advanced Excel Modeling", "minProficiency": 70, "weight": 2},
            {"id": "git", "name": "Git & Documentation", "minProficiency": 55, "weight": 1}
        ]
    },
    "ai-ml": {
        "id": "ai-ml",
        "title": "AI/ML Engineer",
        "category": "Artificial Intelligence",
        "requiredSkills": [
            {"id": "python", "name": "Python & Scientific Stack", "minProficiency": 85, "weight": 3},
            {"id": "ml-core", "name": "Machine Learning (Scikit-Learn)", "minProficiency": 80, "weight": 3},
            {"id": "deep-learning", "name": "Deep Learning & PyTorch", "minProficiency": 80, "weight": 3},
            {"id": "vector-rag", "name": "Vector Databases & RAG", "minProficiency": 75, "weight": 2},
            {"id": "model-deployment", "name": "Model Deployment & FastAPI", "minProficiency": 70, "weight": 2},
            {"id": "math-linear-algebra", "name": "Linear Algebra & Calculus", "minProficiency": 70, "weight": 2}
        ]
    }
}
