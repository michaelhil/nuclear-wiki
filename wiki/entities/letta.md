---
title: "Letta (formerly MemGPT)"
type: entity
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[context-management]]"
  - "[[agent-architecture]]"
tags:
  - framework
  - memory
confidence: medium
created: 2026-04-13
updated: 2026-04-13
---

# Letta (formerly MemGPT)

A memory-focused agent framework that implements virtual memory management for LLM context windows, drawing an analogy to operating system memory hierarchies. Manages the movement of information between the limited context window (analogous to RAM) and external storage.

## Nuclear Relevance

Relevant to the [[context-management]] challenges identified in Report 1 §6: how to maintain agent memory across sessions that exceed context window capacity. The virtual memory approach addresses the information loss risks of summarisation-based compression.
