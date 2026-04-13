---
title: "Context Management"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
related:
  - "[[context-windows]]"
  - "[[hallucination]]"
  - "[[retrieval-augmented-generation]]"
tags:
  - architecture
  - safety
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Context Management

Context management addresses the problem of maintaining useful information within the [[context-windows|context window]] as sessions grow beyond the window's capacity. In multi-agent nuclear operations, this is not a theoretical concern — it is an operational certainty.

## The Math

With 8 agents each generating approximately 300 tokens every 45 seconds, the system produces roughly 3,200 tokens per minute. A 128K token window fills in approximately **38 minutes**. This means any operational scenario lasting longer than half an hour requires active context management.

## Compression Methods

Four approaches exist, each with distinct trade-offs:

**Summarisation**: Compress conversation history into summaries. Risk: summarisation is itself an LLM task subject to [[hallucination]]. Research shows hallucinated summaries can reach up to 75% in complex technical content, and information loss is inevitable. Critical details may be silently dropped.

**Truncation**: Remove oldest messages. Simple and introduces no hallucinated content, but information is permanently lost. No mechanism to determine what was important in the removed content.

**Compaction**: Extract and preserve verbatim key lines while removing conversational overhead. Zero hallucination risk because content is preserved exactly. However, requires heuristics to determine what is "key."

**Retrieval-augmented**: Store full history externally and retrieve relevant portions on demand. Preserves everything but depends on retrieval quality (see [[retrieval-augmented-generation]] for failure modes).

## Attention Sinks

Xiao et al. (2024) identified "attention sinks" — the first few tokens in a sequence receive disproportionate attention regardless of content. This means context management must **preserve initial tokens** (typically the system prompt) even when compressing. Removing or summarising the beginning of the context can degrade model behaviour unpredictably.

## Context Discipline

The most effective strategy is prevention: being highly selective about what enters the context in the first place. Not every agent utterance needs to be in every agent's context. Not every retrieved document paragraph needs inclusion. Context discipline — deliberately curating what goes in — prevents the need for lossy compression later.

## Nuclear Safety Implications

For safety-critical operations, the choice of compression method is itself safety-relevant. Summarisation-based compression that silently hallucinates technical details into or out of the compressed history could cause downstream agents to operate on incorrect information without any signal that the data was corrupted by compression. This links directly to [[context-divergence]] in multi-agent systems.
