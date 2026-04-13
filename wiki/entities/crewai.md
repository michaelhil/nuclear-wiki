---
title: "CrewAI"
type: entity
sources:
  - raw/reports/report2-multiagent-v10.md
related:
  - "[[multi-agent-patterns]]"
  - "[[autogen]]"
  - "[[langgraph]]"
tags:
  - framework
  - multi-agent
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# CrewAI

A multi-agent orchestration framework (Moura, 2024) that organises agents into crews with role/goal/backstory triads and process-driven coordination (sequential, parallel, hierarchical). Maps to Pattern 4 (Role-Based Crew) in the [[multi-agent-patterns|taxonomy]].

## Nuclear Relevance

**Limitation**: Rigid role structures cannot accommodate tasks that cross predefined role boundaries. Concurrency is partial (parallel process mode). Not designed for [[epistemic-independence|Pattern 9]] (shared room, concurrent, human-as-peer).

Referenced in Report 6 as one of three frameworks (alongside [[autogen|AutoGen]] and [[langgraph|LangGraph]]) that Level 6 prototyping could adopt for multi-agent architectural decisions.
