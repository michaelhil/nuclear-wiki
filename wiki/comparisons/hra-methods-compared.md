---
title: "HRA Methods Compared for AI-Assisted Operations"
type: comparison
sources:
  - raw/reports/report5-hra-v10.md
related:
  - "[[spar-h]]"
  - "[[idheas-eca]]"
  - "[[atheana]]"
  - "[[human-reliability-analysis]]"
tags:
  - hra
  - safety-analysis
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# HRA Methods Compared for AI-Assisted Operations

Cross-method comparison of SPAR-H, IDHEAS-ECA, and ATHEANA for modelling AI-assisted operator actions.

## Comparison

| Dimension | [[spar-h|SPAR-H]] | [[idheas-eca|IDHEAS-ECA]] | [[atheana|ATHEANA]] |
|-----------|--------|-------------|---------|
| Approach | PSF multipliers | Macrocognitive functions + CFMs | Error-forcing contexts |
| Quantification | Numerical (HEP) | Numerical (HEP) | Qualitative to semi-quantitative |
| AI extension path | Add PSF multipliers | Add AI-specific CFMs to teamwork function | Add AI-related EFCs |
| Dependency model | 5 discrete levels | PIF-based | Scenario-based |
| Handles 3-way conditional | No (needs structural extension) | Partially (through CFM framework) | Yes (through EFC search) |
| Commission errors | Limited | Moderate | Primary strength |
| Best suited for | Screening, quantification | Detailed cognitive analysis | Identifying dangerous scenarios |

## Recommended Workflow (Report 5 §7)

1. **ATHEANA first**: Identify which AI-related scenarios produce error-forcing contexts (which scenarios are dangerous?)
2. **IDHEAS-ECA second**: Detailed cognitive failure mode analysis for the identified scenarios (how does the failure occur?)
3. **SPAR-H third**: Quantification for [[psa-integration|PSA]] (what is the HEP?)

## Key Finding

IDHEAS-ECA provides the most natural extension path because its "teamwork" macrocognitive function already models crew interaction — extending it to human-AI teaming maps onto existing structure. The distinction between cognitive failure modes and performance-influencing factors is cleaner than SPAR-H's PSF model, making it easier to add AI-specific failure modes.

All quantitative values in the walkthroughs are illustrative — no empirical nuclear AI data exists as of April 2026.
