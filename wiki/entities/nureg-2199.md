---
title: "NUREG-2199 — IDHEAS-ECA Methodology"
type: entity
sources:
  - raw/reports/report5-hra-v10.md
related:
  - "[[idheas-eca]]"
  - "[[human-reliability-analysis]]"
  - "[[nrc]]"
  - "[[performance-shaping-factors]]"
  - "[[hra-methods-compared]]"
tags:
  - regulation
  - hra
  - methodology
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# NUREG-2199 — IDHEAS-ECA Methodology

Documents [[idheas-eca|IDHEAS-ECA]] — decomposes operator performance into five macrocognitive functions: detection, understanding, decision-making, action execution, teamwork.

## Structure

For each function, defines: cognitive failure modes (CFMs), performance-influencing factors (PIFs) determining CFM activation, and crew-level modifiers.

## Why Preferred for AI Extension

1. **Teamwork function** already models crew interaction — extends naturally to human-AI teaming
2. **CFM/PIF distinction** cleaner than [[spar-h|SPAR-H]]'s PSF model — AI-specific failure modes ([[automation-bias]], alert fatigue, mode confusion, reconciliation failure) slot into existing framework
3. AI-specific PIFs (reliability, [[trust-calibration]], communication quality) extend the PIF framework without restructuring

See [[hra-methods-compared]] for cross-method comparison.
