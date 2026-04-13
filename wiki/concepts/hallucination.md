---
title: "Hallucination"
type: concept
sources:
  - raw/reports/report1-llm-foundations.md
related:
  - "[[calibration]]"
  - "[[sycophancy]]"
  - "[[retrieval-augmented-generation]]"
  - "[[knowledge-graphs]]"
tags:
  - llm
  - safety
  - failure-mode
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Hallucination

Hallucination is the production of fluent, confident, and factually wrong output by an LLM. It is a structural consequence of the [[transformer-architecture]]'s next-token prediction mechanism, which generates text based on statistical patterns without any internal truth-checking process.

## Types

- **Factual hallucination**: Incorrect facts stated with confidence (wrong setpoints, incorrect procedure references)
- **Logical hallucination**: Invalid reasoning chains that appear sound
- **Entity hallucination**: Confusing or merging distinct entities (mixing up systems, confusing similar procedures)
- **Fabrication**: Inventing data, references, or technical details that do not exist

## The Core Danger: Confidence Without Correctness

The most dangerous property of hallucination is that **hallucinated text reads identically to correct text**. There is no surface-level cue — no hedging, no formatting difference, no signal — that distinguishes a hallucinated statement from an accurate one. The model produces both with equal fluency and apparent confidence.

This is qualitatively different from a human expert who might hesitate, qualify, or show uncertainty when operating outside their knowledge. An LLM's [[calibration]] does not reliably degrade in ways that signal reduced accuracy, particularly on difficult questions where it matters most.

## Rates

Empirical measurements show hallucination rates vary with task complexity:

- Short, factual documents: 1-2%
- Complex technical documents: 10-12%
- Multi-turn agentic workflows: 30-40% (BFCL V4 benchmarks)

Rates decrease with model scale but the phenomenon **persists** — larger models hallucinate less frequently, not never.

## Structural Cause

Hallucination is not a bug to be fixed but a consequence of the generation mechanism. Next-token prediction optimises for fluency and statistical plausibility, not factual accuracy. The model has no internal fact database to check against and no mechanism to distinguish "I know this" from "this sounds right." See [[tokenization]] for why numerical hallucinations are particularly problematic.

## Mitigations

- **[[retrieval-augmented-generation]]**: Grounds output in retrieved documents, but retrieval itself can fail in seven documented ways (Barnett et al., 2024)
- **[[knowledge-graphs]]**: Provide deterministic constraint checking, blocking outputs that contradict known facts
- **Consistency checking**: Multiple generation passes compared for agreement
- **Human review**: Operator verification of AI outputs

No single mitigation eliminates hallucination. The [[defense-in-depth]] approach — layering multiple independent checks — is the most robust strategy. For nuclear applications, the combination of KG constraints, retrieval grounding, and mandatory [[human-authority]] review provides the necessary barrier structure.
