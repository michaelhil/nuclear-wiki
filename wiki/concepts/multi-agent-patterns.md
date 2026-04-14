---
title: "Multi-Agent Patterns"
type: concept
sources:
  - raw/reports/report2-multiagent-v10.md
related:
  - "[[epistemic-independence]]"
  - "[[model-heterogeneity]]"
  - "[[situation-awareness]]"
tags:
  - multi-agent
  - architecture
  - taxonomy
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Multi-Agent Patterns

A 10-pattern taxonomy organises the design space for multi-agent LLM systems. Patterns are characterised along four dimensions: concurrency (sequential vs. parallel), context isolation (shared vs. separate), human participation (observer vs. peer), and turn-taking (structured vs. free-form).

## Pattern Taxonomy

**P0 — Role Simulation**: Single model plays multiple roles. Baseline approach. No true independence.

**P1 — Autonomous Loop**: Single agent in a self-directed perceive-reason-act cycle. No inter-agent communication.

**P2 — Sequential Pipeline**: Agents process in fixed order. Output of one becomes input of next. Clear audit trail.

**P3 — Orchestrator-Worker**: Central orchestrator delegates tasks to specialist workers. Most common enterprise pattern. Single point of coordination.

**P4 — Role-Based Crew**: Named roles with defined responsibilities (CrewAI model). Structured collaboration with role-specific prompts.

**P5 — Group Chat**: Open multi-agent discussion (AutoGen model). Flexible but harder to control.

**P6 — Handoff**: Agents transfer control to each other based on expertise (Swarm pattern). Dynamic routing.

**P7 — Personal Assistant + Heartbeat**: Persistent agent with scheduled background monitoring. Enables proactive behaviour via heartbeat mechanism.

**P8 — Organisational Hierarchy**: Agents in management layers (Paperclip model). Mirrors organisational structure.

**P9 — Shared Room**: Concurrent agents with enforced context isolation and human operator as peer participant. Most aligned with nuclear control room operations. Least developed in current literature.

## Characteristic Failures

Each pattern has distinctive failure modes. P0 cannot achieve [[epistemic-independence]]. P3 creates single points of failure at the orchestrator. P5 can produce runaway conversations. P9 requires careful [[context-divergence]] management.

## Nuclear Relevance

Pattern 9 (Shared Room) maps most naturally to nuclear control room operations: multiple specialist agents operating concurrently with enforced separation, a human operator participating as a peer with final authority, and structured [[delivery-modes]] for managing information flow. The full Pattern 9 deployment with 7 agents is described in emergency scenarios like the LOCA response (see [[emergency-response]]).

Pattern selection is not purely technical — it determines the achievable level of [[epistemic-independence]], the natural [[human-authority]] integration points, and the [[situation-awareness]] characteristics of the system.
