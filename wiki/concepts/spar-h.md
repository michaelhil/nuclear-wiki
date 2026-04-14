---
title: "SPAR-H"
type: concept
sources:
  - raw/reports/report5-hra-v10.md
related:
  - "[[human-reliability-analysis]]"
  - "[[performance-shaping-factors]]"
  - "[[psa-integration]]"
tags:
  - hra
  - method
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# SPAR-H

SPAR-H (Standardized Plant Analysis Risk — Human Reliability Analysis) is an HRA method documented in NUREG/CR-6883. It uses a multiplicative approach where base human error probabilities are modified by [[performance-shaping-factors]] to produce context-specific error estimates.

## Base Error Rates

SPAR-H defines two base HEP values:

- **Diagnosis tasks**: 1E-2 (1 in 100) — understanding what is happening and determining the appropriate response
- **Action tasks**: 1E-3 (1 in 1,000) — executing a known procedure correctly

These base rates are then multiplied by PSF values that increase or decrease the probability depending on conditions.

## Standard PSFs

SPAR-H uses eight PSFs as multipliers:

1. Available time
2. Stress and stressors
3. Complexity
4. Experience and training
5. Procedures
6. Ergonomics and HMI
7. Fitness for duty
8. Work processes

Each PSF has defined levels (e.g., nominal, degraded, severely degraded) with corresponding multiplier values.

## Extension for AI-Assisted Operations

SPAR-H can be extended by adding new PSFs for AI-related factors:

- **AI system reliability**: How reliable is the AI advisory output for the current task type
- **Trust calibration**: How well-calibrated is the operator's trust relative to actual AI reliability (see [[trust-calibration]])

These new PSFs would function as additional multipliers in the existing framework, modifying the base HEP to account for AI influence.

## Structural Limitation

SPAR-H's dependency model defines five levels of dependency between successive human actions. However, this model **cannot handle three-way conditional dependencies**: the probability of operator error depends on (1) whether the prior action was correct, (2) whether the AI recommendation was correct, AND (3) how the operator responded to the AI.

The existing two-way dependency model (prior action success/failure influencing current action) is insufficient. A structural extension to the dependency model is needed to properly capture human-AI interaction dynamics. This is a fundamental limitation, not a simple parameter adjustment.

The three-way dependency structure means the error probability space is larger than SPAR-H's current framework can represent, requiring either model extension or simplifying assumptions that may not be conservative.
