---
title: "Context Windows"
type: concept
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[context-management]]"
  - "[[transformer-architecture]]"
  - "[[statelessness]]"
tags:
  - llm
  - architecture
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Context Windows

The context window is the fixed-size buffer that defines the total amount of text a large language model can process in a single invocation. Current models range from 128K to over 1M tokens. For reference, 128K tokens corresponds to approximately 200-300 pages of text — roughly equivalent to a complete PWR Emergency Operating Procedure set.

## Hard Boundary

The context window is an absolute boundary. **Everything outside the window does not exist** to the model. There is no partial awareness, no degraded access — information beyond the window is simply absent. This interacts directly with [[statelessness]]: since the model has no memory between calls, the context window is the entirety of what the model knows at any given moment.

## Usable vs. Raw Capacity

The usable capacity is significantly less than the raw token limit. System prompts, conversation history, tool definitions, and retrieved documents all consume context space. A 128K window may have only 80-90K tokens available for actual operational content after infrastructure overhead.

## Context Degradation

Two empirical findings constrain effective use:

**Lost in the middle** (Liu et al., 2024): Models systematically underuse information in the middle of long contexts, preferring the beginning and end. This means the ordering of information matters for accuracy — identical content produces different results depending on position within the context.

**Context rot** (Hong et al., 2025): Every model degrades at every length increment. Performance is not flat up to the window limit and then drops off — it degrades progressively as context grows. Du et al. (2025) measured 13.9% to 85% degradation with length even when retrieval was perfect. This is not a retrieval problem; it is an attention problem inherent to the [[transformer-architecture]].

## Over-Retrieval Problem

A counterintuitive finding: retrieving more relevant documents can degrade output quality. Adding marginally relevant content consumes context space, introduces noise, and triggers context rot. For [[retrieval-augmented-generation]] systems, retrieval **precision** matters more than recall. It is better to include three highly relevant paragraphs than thirty somewhat relevant pages.

## Nuclear Implications

For nuclear applications, context window limitations mean:

- Long procedures may need to be chunked and managed across multiple invocations via [[context-management]]
- Multi-agent systems with shared context fill windows rapidly (8 agents generating 300 tokens every 45 seconds fills 128K in approximately 38 minutes)
- Critical safety information must be positioned carefully within the context, not buried in the middle
- The system must track what is and is not in each agent's current context to understand what it can and cannot reason about — directly linking to [[situation-awareness]]
