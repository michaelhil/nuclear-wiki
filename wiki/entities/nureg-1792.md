---
title: "NUREG-1792 — Good Practices for HRA"
type: entity
sources:
  - raw/reports/report5-hra-v10.md
related:
  - "[[human-reliability-analysis]]"
  - "[[nrc]]"
  - "[[spar-h]]"
  - "[[idheas-eca]]"
  - "[[atheana]]"
tags:
  - regulation
  - hra
  - methodology
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# NUREG-1792 — Good Practices for HRA

NRC guidance on implementing human reliability analysis in PSAs. Covers method selection, HFE definition, HEP quantification, and event tree integration.

## Key Good Practices

- **Scenario-based**: HFEs defined in context of specific accident scenarios, not generically
- **Method selection**: [[atheana|ATHEANA]] for commission errors, [[spar-h|SPAR-H]] for screening, [[idheas-eca|IDHEAS-ECA]] for cognitive analysis
- **Dependency assessment**: Sequential actions assessed for dependency
- **Documentation**: Full traceability from scenario through HFE to quantification

## Extension Needs for AI-Assisted Operations

Report 5 identifies needs for: new HFE types (follow incorrect AI, override correct AI), new dependency structures (three-way conditional), new [[performance-shaping-factors]] (AI reliability, trust calibration), and acknowledgment that no empirical data exists for AI-related HEPs.
