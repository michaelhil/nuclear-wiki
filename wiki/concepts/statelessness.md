---
title: "Statelessness"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[context-windows]]"
  - "[[agent-architecture]]"
tags:
  - llm
  - architecture
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Statelessness

The base LLM model has **zero memory between invocations**. Each API call starts completely fresh with only the context provided in that specific request. The model does not remember previous conversations, does not learn from operational experience in real time, and has no persistent internal state.

## Model vs. System

A critical distinction: the **model** is stateless, but the **agent system** built around it need not be. An [[agent-architecture]] can maintain state through external mechanisms — conversation history databases, episodic memory stores, knowledge graphs, and file systems. At each invocation, relevant stored context is re-injected into the model's [[context-windows|context window]], creating the appearance of continuity.

This means continuity is constructed, not inherent. The quality of apparent memory depends entirely on:

- What was stored from previous interactions
- How well retrieval selects relevant history
- How much context space is available for re-injection
- Whether summarisation or compression introduced errors (see [[context-management]])

## No Real-Time Learning

The model's weights are frozen after training. It does not update based on operational experience. If an operator corrects an error, the model will not "remember" that correction in the next session unless the correction is explicitly stored and re-injected. This is fundamentally different from how human operators build expertise over time.

Adaptation to site-specific conditions, recurring plant behaviours, or operator preferences requires external mechanisms — [[fine-tuning]] for persistent changes, or [[retrieval-augmented-generation]] for dynamic knowledge updates.

## Implications for Nuclear Operations

Statelessness creates specific challenges:

- **Shift continuity**: A [[shift-handover]] cannot rely on the model "knowing" what happened during the previous shift. All relevant context must be explicitly constructed and provided.
- **Operational learning**: Lessons from previous events must be captured in external stores and retrieved, not assumed to be part of the model's knowledge.
- **Consistency**: The same question asked in two separate sessions may get different answers not because the model "changed its mind" but because different context was provided (compounded by [[non-determinism]]).

The statelessness property is architectural — it cannot be changed without fundamentally altering how transformers work. System design must account for it rather than working around it.
