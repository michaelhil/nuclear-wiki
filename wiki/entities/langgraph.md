---
title: "LangGraph"
type: entity
sources:
  - raw/reports/report2-multiagent-v10.md
related:
  - "[[multi-agent-patterns]]"
  - "[[crewai]]"
  - "[[autogen]]"
tags:
  - framework
  - multi-agent
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# LangGraph

LangChain's graph-based agent orchestration framework (2024). Represents agent workflows as directed graphs with a centralised StateGraph managing shared state. Supports sequential chains, conditional branching, fan-out/fan-in parallelism, and iterative cycles.

LangGraph is infrastructure rather than a framework — provides routing and state management without specifying agent behaviour.

## Nuclear Relevance

**Limitation**: Explicit state management becomes unwieldy for complex conditional flows. Concurrency supported for parallel branches but not for conversational interaction. Not designed for Pattern 9 (shared room).

Referenced in Report 6 as one of three frameworks for Level 6 multi-agent prototyping.
