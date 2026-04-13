---
title: "Scenario 8: Multi-Unit SMR Monitoring"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[smr]]"
  - "[[multi-agent-patterns]]"
  - "[[situation-awareness]]"
tags:
  - scenario
  - smr
  - pattern-9
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Scenario 8: Multi-Unit SMR Monitoring

**Reactor**: Generic SMR, four modules, shared control room.
**Pattern**: Pattern 9 (9 agents).
**Primary concept**: Multi-unit SA scaling.

## Description

The most agent-dense scenario: 9 agents monitoring four reactor modules from a single control room. Agents must maintain SA across unit boundaries and detect cross-unit [[common-cause-failure|common-cause]] conditions.

Proposes adaptive execution model: single-agent mode during normal conditions, escalating to multi-agent operation when transients are detected. This matches architectural complexity to operational demand.
