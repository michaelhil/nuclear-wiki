---
title: "PSA Integration"
type: concept
sources:
  - raw/reports/report5-hra-v10.md
related:
  - "[[human-reliability-analysis]]"
  - "[[spar-h]]"
  - "[[performance-shaping-factors]]"
tags:
  - safety-analysis
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# PSA Integration

Integrating AI advisory systems into Probabilistic Safety Assessment (PSA) requires extending event tree and fault tree models to capture the new failure and success pathways introduced by human-AI interaction.

## Event Tree Extensions

Traditional event trees model binary outcomes at each node (system succeeds/fails, operator responds correctly/incorrectly). AI advisory introduces new branching:

- **AI recommendation correct / incorrect**: The AI provides accurate or inaccurate advice
- **Operator follows / overrides**: The operator accepts or rejects the AI recommendation

This creates a four-way branch at each AI-influenced decision point:
1. AI correct, operator follows → successful outcome
2. AI correct, operator overrides → potential error (under-trust)
3. AI incorrect, operator follows → potential error ([[automation-bias]])
4. AI incorrect, operator overrides → successful outcome (independent judgment)

## Sensitivity Analysis

Preliminary analysis shows that two [[performance-shaping-factors]] **dominate uncertainty** in AI-influenced PSA results:

- **AI reliability PSF**: The probability that the AI recommendation is correct. Small changes in assumed AI reliability produce large changes in overall risk estimates.
- **Automation bias PSF**: The probability that the operator follows AI advice without independent evaluation. This determines how strongly AI errors propagate to operator actions.

These two factors interact: high AI reliability reduces the frequency of path 3 (AI wrong, operator follows), but high automation bias increases the conditional probability of path 3 when AI is wrong.

## Screening-Level Approach

Given the absence of empirical data for AI-related PSF values, a screening-level bounding approach is appropriate: use conservative (pessimistic) values for AI reliability and automation bias, and determine whether the AI advisory system provides net benefit even under pessimistic assumptions.

## Human-AI Dependency

The relationship between human and AI is neither independent nor fully dependent:

- **Not independent**: Human and AI share information (same plant data), and AI directly influences operator judgment
- **Not fully dependent**: The operator can override AI recommendations based on independent knowledge and observation

This intermediate dependency is not well-handled by existing HRA dependency models (see [[spar-h]] limitations). The appropriate dependency level lies between the standard "complete" and "zero" dependency assumptions, requiring new modelling approaches specific to human-AI teams.
