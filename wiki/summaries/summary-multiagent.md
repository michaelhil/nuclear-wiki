---
title: "Report 2: Multi-Agent Systems — Summary"
type: summary
sources:
  - raw/reports/report2-multiagent-v10.md
related:
  - "[[multi-agent-patterns]]"
  - "[[epistemic-independence]]"
  - "[[monoculture-collapse]]"
  - "[[situation-awareness]]"
  - "[[human-authority]]"
  - "[[model-heterogeneity]]"
tags:
  - multi-agent
  - architecture
  - coordination
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Report 2: Multi-Agent Systems — Summary

Report 2 develops a taxonomy of multi-agent LLM architectural patterns, maps coordination mechanisms to Situation Awareness theory, and analyses the epistemic distinction between single-agent simulation and true multi-agent operation.

## Key Findings

**10-Pattern Taxonomy**: The report defines [[multi-agent-patterns|Patterns 0-9]] discriminated along four dimensions: concurrency, context isolation, human participation mode, and turn-taking mechanism. Pattern 0 (single-agent role simulation) is the baseline; Pattern 9 (shared room with concurrent agents, enforced context isolation, and human peer participation) is the most complex and least developed in current literature.

**Single-Agent Simulation vs Multi-Agent Operation**: A single LLM holds all simulated perspectives in unified attention — the [[transformer-architecture]] cannot partition knowledge between simulated "agents." All roles share the same weights and distributional biases. Controlled experiments show separate instances achieve 88% accuracy on personality-differentiated reasoning; single-model simulation achieves 50% (chance).

**[[epistemic-independence|Epistemic Independence]]**: Decorrelated reasoning errors require model heterogeneity and context isolation. [[monoculture-collapse|Monoculture collapse]] occurs when agents sharing a base model exhibit correlated systematic errors, defeating the purpose of redundancy. For safety-critical verification roles, [[model-heterogeneity]] is a correctness requirement, not an enhancement.

**[[situation-awareness|Situation Awareness]] Mapping**: Each agent's context window IS its SA boundary. Context divergence is distributed SA failure. Coordination mechanisms (rooms, threading, delivery modes) are SA management infrastructure. The SA Bridge role translates agent communication into operator-usable formats.

**Pattern 9 Infrastructure**: Requires identity persistence (soul prompts), per-agent memory, turn-taking and [[delivery-modes|delivery control]], message threading, heartbeat triggering, tools, shared artefacts, and [[human-authority|human control mechanisms]] (room pause, governance gates, flow gates).

**Survey of 12 Frameworks**: No surveyed system (including [[autogen|AutoGen]], [[crewai|CrewAI]], [[langgraph|LangGraph]]) implements full Pattern 9. No system provides architecturally enforced information asymmetry. The design space is rich in orchestration patterns and sparse in architectures that treat the human as a peer participant.

## Significance

The taxonomy provides a shared vocabulary for distinguishing architectures currently treated as equivalent. The epistemic independence analysis grounds the argument for model diversity in architectural properties rather than behavioural observations.
