---
title: "Scenario 4: Independent Safety Verification"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[common-cause-failure]]"
  - "[[model-heterogeneity]]"
  - "[[knowledge-graphs]]"
  - "[[epistemic-independence]]"
  - "[[pwr]]"
  - "[[defense-in-depth]]"
tags:
  - scenario
  - pwr
  - pattern-9
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Scenario 4: Independent Safety Verification

**Reactor**: Generic PWR.
**Pattern**: Pattern 9 + model diversity.
**Primary concepts**: [[common-cause-failure]], [[knowledge-graphs|KG]] guardrails, [[epistemic-independence]].

## Description

An AI agent recommends a safety-significant action. A second agent on a **different base model** independently evaluates the same situation. This directly tests whether [[model-heterogeneity]] provides genuine [[epistemic-independence]].

## Architecture

- **Primary analyst** (Model A): Evaluates situation, queries plant data, retrieves procedures, produces recommendation
- **Verification agent** (Model B, different provider): Receives same plant data but performs own independent analysis. Does NOT receive the primary analyst's recommendation — works from raw data to conclusion
- **KG validator**: Checks both outputs against [[knowledge-graphs|knowledge graph]] of Tech Spec limits, operability requirements, and procedure prerequisites

## Why Model Diversity Is Required

Same base model = shared systematic biases. Agreement carries no more epistemic weight than asking the same person twice ([[monoculture-collapse]]). Different models from different providers have less correlated errors — agreement provides genuine evidence of correctness, disagreement signals genuine uncertainty.

## Outcome Handling

- **Both agree + KG validates**: High confidence, presented to operator with [[human-authority|governance gate]]
- **Agents disagree**: Both assessments shown with disagreement highlighted. Conservative action pending operator resolution
- **KG flags either output**: Flagged assertion blocked before reaching operator

## Demonstrated Principles

This is [[defense-in-depth]] for AI: three independent layers (Model A, Model B verification, KG constraint checking) with distinct failure modes. Tests whether independence produces measurable error detection improvement over same-model verification.
