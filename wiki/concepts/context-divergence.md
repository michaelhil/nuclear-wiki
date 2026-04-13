---
title: "Context Divergence"
type: concept
sources:
  - raw/reports/report2-multi-agent-systems.md
related:
  - "[[context-windows]]"
  - "[[context-management]]"
  - "[[situation-awareness]]"
tags:
  - multi-agent
  - failure-mode
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Context Divergence

Context divergence occurs when agents in a multi-agent system build different internal representations of the same situation due to differences in their context windows. This is a structural failure mode — not a reasoning error but a perception error in the [[situation-awareness]] framework.

## Causes

Multiple factors drive context divergence:

**Different join times**: An agent that has been active since shift start has a different context history than one that joined mid-shift. The late-joiner lacks the context built during earlier discussions and events.

**Different compression**: As contexts exceed [[context-windows|window limits]], different agents apply [[context-management]] at different times, compressing different portions of shared history. Asymmetric compression means agents retain different subsets of the same information.

**Different threading**: Agents involved in different sub-conversations build contexts around different information streams. A thermal-hydraulics agent discussing RCS parameters and a procedure agent discussing administrative requirements may have minimal context overlap.

**Different retrieval**: Agents using [[retrieval-augmented-generation]] may retrieve different documents for the same query, leading to divergent grounding information.

## The Math

With 8 agents each generating approximately 300 tokens every 45 seconds, the system produces roughly 3,200 tokens per minute. A 128K token window fills in approximately 38 minutes. After this point, agents begin operating from compressed, partial views of the shared operational history. Each agent's compressed view is different.

## SA Framework Mapping

In Endsley's model, context divergence is a **Level 1 (perception) failure**. Agents perceive different facts about the same situation. Their L2 comprehension and L3 projection naturally diverge because they are reasoning from different starting points. The fix is better context management, not better reasoning models.

## Late-Joiner Problem

A particularly acute form of context divergence occurs when an agent is newly started or restarted mid-operation. It joins with an empty context and must rapidly build [[situation-awareness]] from available sources. Until its context catches up, it may produce assessments based on incomplete information — potentially contradicting agents with fuller context, or missing critical operational history.

## Mitigation

Addressing context divergence requires explicit architectural support: shared state stores that all agents can query, context synchronisation protocols, and monitoring for divergence between agent assessments that may signal underlying context differences rather than genuine analytical disagreement.
