---
title: "Scenario 4: Independent Safety Verification"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[common-cause-failure]]"
  - "[[model-heterogeneity]]"
  - "[[knowledge-graphs]]"
  - "[[pwr]]"
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
**Primary concepts**: [[common-cause-failure]], [[knowledge-graphs|KG]] guardrails.

## Description

Two agents on different base models independently verify a safety-related assessment. KG guardrails enforce hard constraints against verified domain knowledge. Demonstrates why [[model-heterogeneity]] is a safety requirement for verification roles, not an enhancement — agents on the same model share systematic errors ([[monoculture-collapse]]).

## Key Design Elements

- Two different base models from different providers
- KG constraint checking validates outputs against plant configuration
- Agreement between heterogeneous agents carries genuine epistemic weight
- Disagreement triggers conservative action and human review
