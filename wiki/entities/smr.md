---
title: "Small Modular Reactor (SMR)"
type: entity
sources:
  - raw/reports/report4-scenarios-v10.md
  - raw/reports/report3-nuclear-v11.md
related:
  - "[[pwr]]"
  - "[[scenario-shift-handover]]"
  - "[[scenario-multi-unit-smr]]"
  - "[[scenario-fuel-monitoring]]"
  - "[[common-cause-failure]]"
tags:
  - reactor
  - nuclear
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Small Modular Reactor (SMR)

A generic four-module SMR plant with shared control room is used in Scenarios 1, 6, and 8. No specific licensed design is modelled.

## Multi-Unit Monitoring Challenges

SMR plants where one crew oversees multiple modules create unique AI advisory challenges:

- **Cross-unit SA**: Agents must maintain [[situation-awareness]] across module boundaries
- **[[common-cause-failure]] detection**: Correlated conditions across modules may indicate shared root causes
- **Operator [[cognitive-load]]**: Monitoring 4 modules exceeds conventional control room designs
- **Adaptive scaling**: [[scenario-multi-unit-smr|Scenario 8]] proposes single-agent per module normally, escalating to 9 agents during transients

Multi-unit SMR operation is where AI advisory may be most directly valuable: the monitoring task exceeds single-operator capacity, and per-module agents with cross-unit coordination maps naturally to the plant structure.
