---
title: "Scenario 9: Compound Event with Ambiguous Indications"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[model-heterogeneity]]"
  - "[[epistemic-independence]]"
  - "[[human-authority]]"
  - "[[pwr]]"
tags:
  - scenario
  - pwr
  - pattern-9
  - emergency
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Scenario 9: Compound Event with Ambiguous Indications

**Reactor**: Generic PWR.
**Pattern**: Pattern 9 + model diversity.
**Primary concepts**: AI failure under compound event, operator override.

## Description

A seismic event concurrent with a coolant leak produces indicators consistent with a LOCA but whose actual root cause is different. Multiple information sources provide contradictory evidence. This represents Category 5 on the decision type spectrum (ambiguous multi-source synthesis under uncertainty).

## Key Finding

This scenario demonstrates deliberate AI failure: the compound event falls outside the training distribution of all models. The correct system behaviour is to recognise uncertainty, present conflicting evidence transparently, and defer to the operator's [[human-authority|governance authority]]. The adversarial agent challenges premature consensus. [[model-heterogeneity]] ensures agents fail differently rather than converging on the same wrong answer.

The scenario validates the principle that the AI system's most important capability under compound events is honest uncertainty expression, not confident diagnosis.
