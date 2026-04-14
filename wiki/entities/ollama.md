---
title: "Ollama"
type: entity
sources:
  - raw/reports/report6-prototyping-guide-v12.md
related:
  - "[[local-deployment]]"
  - "[[capability-gradient]]"
  - "[[quantization]]"
  - "[[frontier-vs-local-models]]"
tags:
  - tools
  - local-deployment
  - infrastructure
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Ollama

Open-source tool for running LLMs locally, abstracting model loading, [[quantization]], and GPU memory management.

## Role in Nuclear AI Prototyping

Primary serving tool for Level 1 of the [[capability-gradient]]. Entry point for nuclear researchers to run models behind air-gap boundaries.

## Key Features for Nuclear Use

- **GGUF format**: Runs quantised models (4-bit to 8-bit) on workstations to high-end servers
- **Model library**: Llama, Mistral, Gemma, Qwen families — supports [[model-heterogeneity]] experiments
- **OpenAI-compatible API**: Existing [[mcp|MCP]] integrations work without code changes
- **No cloud dependency**: All inference local, no provider safety filters suppressing nuclear-domain discussion

Enables the critical L0→L1 transition where the researcher gains control over the full inference pipeline.
