---
title: "Procedure-AI Interaction"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[knowledge-graphs]]"
  - "[[graded-autonomy-tiers]]"
  - "[[defense-in-depth]]"
tags:
  - nuclear
  - operations
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Procedure-AI Interaction

Procedure-AI interaction addresses how AI systems work with nuclear operating procedures — the structured documents that govern plant operations. The optimal architecture represents procedures as [[knowledge-graphs|knowledge graph]] structures while using LLMs to handle the interpretive boundaries that pure graph traversal cannot reach.

## Procedures as Knowledge Graphs

Nuclear procedures can be formally represented as graph structures:

- **Nodes**: Steps, conditions, LCO limits, action times, decision points, required actions
- **Edges**: Typed relationships — precedes, requires, triggers, limits, references, conditions-on

This representation enables machine-traversable procedure logic. A rule engine can deterministically track position within a procedure, check whether conditions for transitions are met, and verify that action times are being observed — all without relying on probabilistic LLM interpretation.

## Division of Labour

The hybrid architecture divides work based on each technology's strengths:

**Knowledge graph + rule engine handles**: Procedure step tracking, LCO limit checking, action time monitoring, prerequisite verification, system interrelationship tracking. These are structured logic tasks with deterministic correct answers.

**LLM handles**: Interpretive boundary situations where plant conditions do not map cleanly to procedure steps, multiple interacting LCOs creating complex decision spaces, natural language explanation of procedure requirements to operators, and synthesising information from multiple procedure sections.

## The Interpretive Boundary

The interpretive boundary is where structured procedure logic meets operational ambiguity. Examples:

- A parameter is trending toward but has not reached a limit — does the procedure apply?
- Two LCOs interact in a way not explicitly addressed by either
- Plant conditions partially match multiple procedure entry conditions
- Operator judgment is required to select among multiple applicable procedures

These situations require the kind of contextual reasoning and natural language understanding that LLMs provide. The KG provides the structured facts; the LLM provides the interpretation.

## Safety Architecture

This division is itself a form of [[defense-in-depth]]: the deterministic layer (KG + rule engine) catches LLM errors that violate structured constraints, while the LLM handles what the deterministic layer cannot represent. Neither is sufficient alone; together they provide broader coverage with independent failure modes.
