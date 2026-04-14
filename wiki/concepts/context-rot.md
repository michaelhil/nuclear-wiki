---
title: "Context Rot"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[context-windows]]"
  - "[[context-management]]"
  - "[[output-vacuity]]"
  - "[[retrieval-augmented-generation]]"
tags:
  - llm
  - architecture
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Context Rot

Context rot is the measurable degradation of LLM performance as input context length increases, independent of content relevance or retrieval quality. Formalised by Hong, Troynikov, and Huber (2025), who tested 18 frontier models and found that **every model exhibits performance degradation at every context length increment**, even on simple retrieval and text replication tasks.

## The Counterintuitive Finding

Du et al. (2025) demonstrated an even more surprising result: performance degrades by **13.9% to 85%** as input length increases even when the model can perfectly retrieve all relevant information. The degradation persists when irrelevant tokens are replaced with whitespace and when all irrelevant tokens are masked. This means **sheer length alone**, independent of distraction or retrieval difficulty, imposes a processing cost.

## Architectural Cause

The mechanism is a property of transformer-based attention: as the number of tokens grows, the model's finite attention budget spreads thinner across more pairwise relationships. The effective processing quality for any individual piece of evidence diminishes. This connects to the "lost in the middle" effect (Liu et al., 2024) where information placed in the centre of long contexts receives less attention.

## Implication: Over-Retrieval Is Harmful

The standard [[retrieval-augmented-generation|RAG]] engineering instinct is to retrieve generously — include more documents to reduce the chance of missing something relevant. Context rot **inverts this reasoning**: over-retrieval actively degrades response quality. Poor retrieval precision doesn't merely waste context space; it causes the same attention dilution that produces [[output-vacuity|slop]].

**Retrieval precision matters more than recall** for nuclear AI advisory systems.

## Context Discipline

Context discipline — being deliberate and selective about what enters context — is a first-line defence against both context rot and output vacuity. Practical strategies:

- Limit retrieved documents to the **minimum** that covers the query
- Use metadata filters (document type, system code, revision date) to pre-screen retrieval results
- Place critical information at the **beginning and end** of context (exploiting primacy/recency bias)
- Periodically reset multi-turn sessions with fresh summaries anchored to current state
- Monitor context utilisation as an operational metric

Report 6 Level 2 develops prototyping investigations for these strategies.
