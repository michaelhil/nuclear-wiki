---
title: "Situation Awareness"
type: concept
sources:
  - raw/reports/report2-multi-agent-systems.md
related:
  - "[[context-windows]]"
  - "[[context-divergence]]"
  - "[[human-authority]]"
  - "[[delivery-modes]]"
tags:
  - human-factors
  - multi-agent
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Situation Awareness

Situation awareness (SA) is the perception, comprehension, and projection of environmental elements in time and space. Endsley's (1995) three-level model provides the foundational framework:

- **Level 1 — Perception**: What elements are present in the environment
- **Level 2 — Comprehension**: What those elements mean in context
- **Level 3 — Projection**: What will happen next based on current understanding

## Mapping to LLM Agents

For LLM agents, the SA framework maps directly to architectural properties:

- **L1 (Perception)** = What is in the agent's [[context-windows|context window]]. The context window IS the SA boundary — anything outside it is not perceived.
- **L2 (Comprehension)** = The LLM's inference capabilities applied to context content. Understanding relationships, identifying anomalies, recognising patterns.
- **L3 (Projection)** = Chain-of-thought reasoning about future states, or [[tool-calling]] to simulation codes for physics-based projection (see [[simulator-coupling]]).

## Distributed SA in Multi-Agent Systems

Stanton's Distributed SA (DSA) theory treats SA as an emergent sociotechnical property — not something any single agent possesses but something that arises from the interactions between agents (human and AI) and their environment. Gao et al.'s ATSA framework formally includes AI agents as SA subjects.

[[context-divergence|Context divergence]] directly maps to distributed SA failure: when agents build different contexts (different join times, different compression histories, different retrieved documents), their L1 perception diverges, leading to divergent L2 comprehension and L3 projection.

## Out-of-Loop Problem

A critical human factors concern: operator SA degrades with longer autonomous AI horizons. If the AI system operates independently for extended periods, the human operator loses track of the evolving situation. When they need to intervene — precisely when human judgment matters most — their SA is poorest.

## SA Bridge Role

The SA Bridge is a designated agent role that translates multi-agent outputs into operator-comprehensible summaries. It does not generate its own analysis but synthesises and presents other agents' work in a format optimised for maintaining operator SA. This role maps to the [[hsi-architecture]] delivery layer.

## Worked Example

Two agents with different conversation histories have different L1 (different facts perceived). This leads to different L2 (different interpretations of plant state). Their L3 projections diverge because they are projecting from different understood states. This is not a reasoning failure — it is a perception failure caused by [[context-management]] differences. The fix is better context management, not better models.
