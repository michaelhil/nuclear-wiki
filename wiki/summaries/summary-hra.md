---
title: "Report 5: Human Reliability Analysis — Summary"
type: summary
sources:
  - raw/reports/report5-hra-v10.md
related:
  - "[[human-reliability-analysis]]"
  - "[[spar-h]]"
  - "[[idheas-eca]]"
  - "[[atheana]]"
  - "[[performance-shaping-factors]]"
  - "[[psa-integration]]"
  - "[[automation-bias]]"
tags:
  - hra
  - psa
  - human-factors
  - safety-analysis
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Report 5: Human Reliability Analysis — Summary

Report 5 demonstrates how three established HRA methods handle AI-assisted nuclear operations by walking through each method applied to specific scenarios.

## Methods Examined

- **[[spar-h|SPAR-H]]** (NUREG/CR-6883): PSF multiplier model. Can accommodate AI reliability and trust calibration as additional multipliers, but the dependency model cannot handle the three-way conditional (prior action, AI recommendation, operator response) without structural extension.

- **[[idheas-eca|IDHEAS-ECA]]** (NUREG-2199): Macrocognitive function decomposition. The "teamwork" function already models crew interaction and extends most naturally to human-AI teaming. AI-specific cognitive failure modes: [[automation-bias]] as decision-making CFM, alert fatigue as detection CFM, mode confusion as understanding CFM, reconciliation failure as teamwork CFM.

- **[[atheana|ATHEANA]]** (NUREG-1624): Identifies error-forcing contexts. AI introduces new EFCs: scenarios where the AI recommendation makes the wrong action appear correct to the operator.

## Key Findings

**All three methods require extension** for AI-assisted operations. No standard method can model the AI-operator interaction without modification.

**IDHEAS-ECA provides the most natural extension path** because it distinguishes cognitive failure modes from performance-influencing factors more cleanly than SPAR-H.

**New [[performance-shaping-factors|PSFs]] needed**: AI system reliability, operator trust calibration, AI-operator communication quality, AI recommendation correctness.

**[[psa-integration|PSA Integration]]**: Event trees must include new branch points for AI recommendation correctness and operator follow/override decisions. Sensitivity analysis shows that the AI reliability PSF and the automation bias PSF dominate uncertainty.

**All quantitative values are illustrative** — no empirical data from nuclear-domain AI evaluations exists as of April 2026.

## Significance

The report provides the methodological framework for incorporating AI advisory systems into existing probabilistic safety assessments, identifying where current methods work, where they need extension, and what empirical data is needed.
