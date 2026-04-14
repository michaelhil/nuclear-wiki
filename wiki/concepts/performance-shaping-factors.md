---
title: "Performance Shaping Factors"
type: concept
sources:
  - raw/reports/report5-hra-v10.md
related:
  - "[[spar-h]]"
  - "[[idheas-eca]]"
  - "[[human-reliability-analysis]]"
  - "[[automation-bias]]"
tags:
  - hra
  - safety-analysis
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Performance Shaping Factors

Performance Shaping Factors (PSFs) are conditions that modify human error probability in [[human-reliability-analysis]]. They represent the contextual factors that make errors more or less likely during a given task.

## Standard PSFs

Established HRA methods use well-characterised PSFs:

- **Available time**: Time pressure increases error probability
- **Stress and stressors**: Elevated stress degrades performance
- **Complexity**: More complex tasks have higher error rates
- **Experience and training**: More experienced operators make fewer errors
- **Procedures**: Quality and availability of procedures affects performance
- **Ergonomics and HMI**: Interface design quality influences error rates
- **Fitness for duty**: Physical and mental fitness affects performance
- **Work processes**: Organisational factors and safety culture

These PSFs have decades of empirical grounding from nuclear operations, human factors research, and event analysis.

## New AI-Related PSFs

AI-assisted operations require new PSFs that have **no empirical basis** for their values:

**AI system reliability**: The probability that the AI advisory is correct for the specific task type. This varies by domain, complexity, and available grounding data. Unlike equipment reliability, it cannot be characterised by failure rate data from operating experience.

**Operator trust calibration**: How well the operator's trust in the AI matches actual reliability. Miscalibrated trust — either over-trust ([[automation-bias]]) or under-trust — modifies the probability that the operator will correctly use or appropriately override AI recommendations. See [[trust-calibration]].

**AI-operator communication quality**: The clarity and specificity of AI outputs. Vague or generic AI advice has different error implications than specific, well-reasoned recommendations. Linked to [[hsi-architecture]] design.

**Recommendation specificity**: Whether the AI provides specific actionable guidance versus generic observations. Specific recommendations that are wrong are more dangerous (strong [[automation-bias]] driver) than vague observations.

## Empirical Gap

The fundamental challenge: no empirical data exists to assign validated values to AI-related PSFs. All values in current analyses are illustrative, based on analogy to other domains or expert judgment. Building this empirical basis requires simulator studies with AI advisory systems — a key output of the [[capability-gradient]] prototyping framework.

Until empirical values exist, sensitivity analysis is essential: understanding which PSFs dominate uncertainty in the [[psa-integration|PSA]] results guides where research effort should focus.
