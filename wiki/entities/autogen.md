---
title: "AutoGen"
type: entity
sources:
  - raw/reports/report2-multiagent-v10.md
related:
  - "[[multi-agent-patterns]]"
  - "[[crewai]]"
  - "[[langgraph]]"
tags:
  - framework
  - multi-agent
  - microsoft
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# AutoGen

A Microsoft Research multi-agent framework (Wu et al., 2024) where agents exchange messages in a GroupChat with LLM-driven speaker selection. Maps to Pattern 5 (Conversational Group Chat) in the [[multi-agent-patterns|taxonomy]].

AutoGen v0.4 overhauled architecture to an actor model with asynchronous message passing, enabling concurrent operation. The actor model provides the architectural primitive (independent processes, asynchronous message passing) that could support Pattern 9.

## Nuclear Relevance

**Limitation**: No built-in circuit breaker for unproductive exchanges or speaker selection loops. Concurrency architecturally supported in v0.4 but API typically sequential. No system provides architecturally enforced information asymmetry between agents.

The Microsoft Agent Framework (2025) combines AutoGen v0.4's actor model with Semantic Kernel's enterprise infrastructure.
