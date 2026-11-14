from typing import Dict, Any, List
from datetime import datetime
from ..models import AgentExecutionEvent

class BaseAgent:
    def __init__(self, name: str, role: str, color: str = "#8B5CF6", avatar: str = "Bot", directive: str = ""):
        self.name = name
        self.role = role
        self.color = color
        self.avatar = avatar
        self.directive = directive
        self.event_log: List[AgentExecutionEvent] = []

    def create_event(
        self,
        event_type: str,
        summary: str,
        details: Dict[str, Any] = None,
        llm_used: bool = False,
        source: str = "rule-based-fallback"
    ) -> AgentExecutionEvent:
        event = AgentExecutionEvent(
            id=f"evt-{int(datetime.now().timestamp() * 1000)}-{self.name.lower()[:3]}",
            timestamp=datetime.now().strftime("%I:%M %p"),
            agentName=self.name,
            agentRole=self.role,
            eventType=event_type,
            summary=summary,
            details=details or {},
            llmUsed=llm_used,
            source=source
        )
        self.event_log.append(event)
        return event

    def get_profile(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "role": self.role,
            "color": self.color,
            "avatar": self.avatar,
            "directive": self.directive
        }
