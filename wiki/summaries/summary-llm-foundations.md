---
title: "Report 1: LLM Foundations — Summary"
type: summary
sources:
  - raw/reports/report1-llm-foundations-v12.md
related:
  - "[[transformer-architecture]]"
  - "[[hallucination]]"
  - "[[calibration]]"
  - "[[tool-calling]]"
  - "[[agent-architecture]]"
  - "[[context-windows]]"
  - "[[retrieval-augmented-generation]]"
  - "[[knowledge-graphs]]"
tags:
  - llm
  - foundations
  - safety
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Report 1: LLM Foundations — Summary

Report 1 provides the technical foundation for understanding LLM-based systems proposed for nuclear advisory roles. It covers architecture, agent systems, failure modes, context management, risk properties, and knowledge grounding.

## Key Findings

**Architecture**: LLMs are transformer-based next-token predictors. The [[transformer-architecture]] uses self-attention where every token in the [[context-windows|context window]] influences every other token — there is no internal partition between system prompt, user input, and tool results. Output is [[non-determinism|stochastic]], violating the deterministic assumptions of nuclear V&V frameworks (IEEE 603, RG 1.152).

**From LLM to Agent**: An LLM becomes an agent when embedded in a perceive-reason-act loop with [[tool-calling]] and memory. The [[agent-architecture|ReAct pattern]] alternates reasoning, action, and observation. The [[mcp|Model Context Protocol]] provides model-agnostic tool connectivity.

**Failure Modes**: The report identifies nine structural failure modes: [[hallucination]] (confident fabrication), poor [[calibration]] (overconfidence), prompt sensitivity (76% accuracy swings from formatting changes), [[sycophancy]] (agreement bias from RLHF), theory of mind limitations, self-correction failure without external feedback, adversarial vulnerability, output vacuity ("slop"), and training data biases.

**The Confidence-Without-Correctness Problem**: Hallucinated output reads identically to correct output — there is no surface-level cue distinguishing them. This is the most dangerous property for safety-critical use.

**Context Management**: [[context-management|Context compression]] (summarisation, truncation) introduces new risks: hallucinated summaries, information loss, and asymmetric compression across agents. The "lost in the middle" effect means LLMs underuse information in the centre of long contexts.

**Decision Type Spectrum**: The report defines five decision categories, from deterministic threshold decisions (use rule engines, not LLMs) through knowledge-based diagnostic reasoning (LLM territory) to ambiguous multi-source synthesis (requires multi-agent architecture). A hybrid pipeline places rule engines, LLMs, knowledge graphs, and human review in sequential layers.

**Knowledge Grounding**: [[retrieval-augmented-generation|RAG]] reduces hallucination by grounding generation in retrieved documents. [[knowledge-graphs|Knowledge graphs]] enforce hard constraints against verified domain knowledge. Neither eliminates hallucination; both provide partial mitigation.

## Significance for Nuclear Applications

The report establishes that LLMs are advisory tools with structural reliability limitations, not deterministic safety systems. Every proposed nuclear application must be evaluated against the specific failure modes described, with mitigation through knowledge grounding, human oversight, and architectural constraints rather than through claims of model improvement alone.
