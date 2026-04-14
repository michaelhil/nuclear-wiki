---
title: "NUREG-0711 — Human Factors Engineering Program Review Model"
type: entity
sources:
  - raw/reports/report3-nuclear-v11.md
related:
  - "[[nrc]]"
  - "[[hsi-architecture]]"
  - "[[nureg-0700]]"
  - "[[graded-autonomy-tiers]]"
  - "[[automation-bias]]"
tags:
  - regulation
  - human-factors
  - methodology
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# NUREG-0711 — Human Factors Engineering Program Review Model

NRC review model for HFE programmes across 12 elements from planning through implementation. Required for Tier 2+ AI advisory under [[graded-autonomy-tiers]].

## Key Programme Elements

- Operating experience review, functional requirements analysis, task analysis
- HSI design following [[nureg-0700]] guidelines
- Human factors V&V — testing that design supports human performance

## AI Advisory Requirements

The HFE programme must address:

- **[[automation-bias]]**: How does AI display design mitigate over-reliance?
- **[[trust-calibration]]**: Do displays support appropriate trust?
- **AI failure mode training**: Operators must recognise [[hallucination]], [[sycophancy]], and [[output-vacuity]]
- **Workload impact**: Does AI reduce or increase operator [[cognitive-load]]?
- **Advisory vs authoritative**: Unambiguous visual distinction between AI output and qualified instruments (see [[hsi-architecture]])
