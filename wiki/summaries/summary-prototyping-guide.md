---
title: "Report 6: Prototyping Guide — Summary"
type: summary
sources:
  - raw/reports/report6-prototyping-guide-v12.md
related:
  - "[[capability-gradient]]"
  - "[[build-vs-assess-gap]]"
  - "[[evaluation-harness]]"
  - "[[local-deployment]]"
  - "[[simulator-coupling]]"
tags:
  - prototyping
  - testing
  - implementation
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Report 6: Prototyping Guide — Summary

Report 6 provides a structured path for building a testing and exploration environment where the claims from Reports 1-5 can be investigated experimentally.

## The [[capability-gradient|Capability Gradient]]

Eight levels, each adding one architectural capability:

| Level | Capability | Core Investigations |
|-------|-----------|---------------------|
| 0 | Structured evaluation of frontier model | Domain knowledge, [[hallucination]], [[calibration]], prompt sensitivity |
| 1 | [[local-deployment]] and model comparison | System prompt effects, error correlation, reproducibility |
| 2 | Knowledge grounding ([[retrieval-augmented-generation|RAG]] and [[knowledge-graphs|KG]]) | Retrieval failure modes, guardrail effectiveness |
| 3 | [[tool-calling]] and ReAct loop | Tool chain reliability, selection accuracy |
| 4 | [[simulator-coupling]] | Forward projection, physics-LLM distinction |
| 5 | Persistent agent with memory | Context management under accumulation, [[operator-modelling]] |
| 6 | Multi-agent coordination | [[epistemic-independence]], productive disagreement |
| 7 | Human in the loop | Decision quality, trust dynamics, HRA parameter estimation |

## Key Principles

**[[build-vs-assess-gap|Build-vs-Assess Gap]]**: Building outpaces assessment. Systems can be prototyped faster than evaluated. The gradient addresses this by producing evidence at each level.

**Levels are experiments, not technologies**: The question at each level is "what can you now investigate?" not "what can you build?"

**Additive gradient**: Nothing built at a lower level is discarded. The Level 0 [[evaluation-harness]] is reused at every subsequent level.

**Time investment**: Level 0 in a day. Full gradient to Level 7 in 6-12 months. Stop at any level for useful output.

**Running example**: RCS temperature anomaly scenario threads through all eight levels.

## Significance

The report makes the full capability gradient accessible to domain experts who are not software engineers, using the operational model where the human specifies requirements and an AI coding agent handles implementation.
