---
title: "Agent Architecture"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[tool-calling]]"
  - "[[context-windows]]"
  - "[[retrieval-augmented-generation]]"
tags:
  - agent
  - architecture
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Agent Architecture

An agent is an LLM combined with a perceive-reason-act loop that enables it to take actions in the world, observe results, and iterate. The ReAct framework (Yao et al., 2023) formalises this as a thought-action-observation cycle: the model reasons about the current state, selects an action (often a [[tool-calling|tool call]]), observes the result, and continues.

## Memory Types

Agents require memory to function beyond single-turn interactions. Four types of memory serve different purposes:

**In-context memory**: The current [[context-windows|context window]] contents. Immediate but size-limited and volatile.

**Episodic memory**: Stored records of past interactions, retrievable by relevance. Enables continuity across sessions but requires retrieval infrastructure.

**Semantic memory**: Domain knowledge accessed via [[retrieval-augmented-generation]] or [[knowledge-graphs]]. Provides factual grounding independent of interaction history.

**Procedural memory**: Reusable skills, templates, and patterns the agent can invoke. Encodes how-to knowledge rather than what-is knowledge.

## Collaborative Memory

For nuclear operations, a fifth category emerges: **collaborative memory** where human operators and AI agents jointly build and maintain shared knowledge stores. Operators can annotate, correct, and validate agent-stored information. This combines human domain expertise with AI's ability to systematically organise and retrieve large volumes of data.

**Temporal memory organisation** structures information by operational periods — shifts, days, outage phases — matching how nuclear operations naturally segment time.

## Autonomy Scale

Agent architectures exist on a spectrum of increasing autonomy:

1. **Chatbot**: Responds to queries, no actions
2. **Assistant**: Responds with access to tools, human-initiated
3. **Tool-using agent**: Autonomously selects and chains tools
4. **Persistent agent**: Maintains state across sessions, background monitoring
5. **Autonomous agent**: Self-directed goal pursuit with minimal human involvement

Key transitions on this scale: the introduction of [[tool-calling]] (from assistant to agent), the addition of persistence and heartbeat mechanisms (from reactive to proactive), and the shift from human-initiated to agent-initiated action.

For nuclear applications, the [[graded-autonomy-tiers]] framework maps these architectural capabilities to regulatory requirements, with higher autonomy levels requiring proportionally more rigorous safety justification and [[human-authority]] controls.
