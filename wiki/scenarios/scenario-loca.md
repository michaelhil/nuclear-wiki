---
title: "Scenario 5: Loss of Coolant Accident — Emergency Response"
type: scenario
sources:
  - raw/reports/report4-scenarios-v10.md
related:
  - "[[emergency-response]]"
  - "[[multi-agent-patterns]]"
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

# Scenario 5: Loss of Coolant Accident — Emergency Response

**Reactor**: Generic PWR.
**Pattern**: Pattern 9 (7 agents).
**Primary concept**: Full role deployment during LOCA response.

## Description

The most complex single-event scenario. Seven agents deploy in a Pattern 9 architecture to support operator response to a LOCA: domain experts (RCS, containment), adversarial agent on different model, projection agent coupled to [[relap5|RELAP5]], synthesiser, SA bridge, and coordination monitor.

## Key Design Elements

- Full functional role specialisation from Report 2 Table 5
- [[human-authority|Governance gates]] for all safety-significant recommendations
- Parallel execution model (7 agents × 8s sequential = 56s; parallel ≈ 8s)
- Mode escalation from normal monitoring to emergency configuration
- [[delivery-modes|Flow gates]] during time-critical phases
- Operator room pause capability
