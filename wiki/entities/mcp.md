---
title: "Model Context Protocol (MCP)"
type: entity
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[tool-calling]]"
  - "[[agent-architecture]]"
  - "[[model-heterogeneity]]"
tags:
  - protocol
  - infrastructure
  - tools
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Model Context Protocol (MCP)

An open standard for connecting LLM agents to external tools and data sources. Introduced by Anthropic (November 2024), adopted by OpenAI, Google, and Microsoft, with the specification donated to the Linux Foundation (May 2025).

## Architecture

MCP defines a client-server architecture built on JSON-RPC 2.0 with three primitives: **Tools** (callable functions), **Resources** (readable data sources), and **Prompts** (reusable interaction templates).

## Significance for Nuclear AI

MCP provides model-agnostic tool connectivity — the same AI advisory tools work with different underlying models without changing integrations. This directly supports [[model-heterogeneity]]: different agents can run on different models while sharing a common tool infrastructure. This reduces vendor lock-in and supports the model diversity that Report 2 argues is needed for independent verification.

As of early 2026, peer-reviewed literature on MCP remains sparse, though the protocol has seen widespread industry adoption.
