---
title: "Single-Agent vs Multi-Agent"
type: comparison
sources:
  - raw/reports/report2-multiagent-v10.md
related:
  - "[[multi-agent-patterns]]"
  - "[[epistemic-independence]]"
  - "[[monoculture-collapse]]"
tags:
  - architecture
  - multi-agent
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Single-Agent vs Multi-Agent

When multi-agent architecture is justified, when it's overkill, and when it's a correctness requirement.

## Decision Criteria (Report 2 §9)

| Criterion | Single Agent | Multi-Agent |
|-----------|-------------|-------------|
| Independent verification needed? | Not required | Required (correctness) |
| Task decomposition clear? | Yes, single context | Complex, needs specialisation |
| Concurrent perspectives needed? | No | Yes |
| Error correlation acceptable? | Yes | No (safety-critical) |
| Coordination overhead justified? | N/A | Must exceed single-agent value |

## When Single-Agent is Preferred

- Well-bounded tasks within single-agent capability
- Structured task decomposition (Pattern 3 orchestrator-worker suffices)
- No independence requirement
- Simpler is better: less coordination overhead, easier auditability
- Cost and latency constraints

## When Multi-Agent is Required

- **Independent verification**: Safety-critical roles where correlated errors defeat the purpose of redundancy → [[epistemic-independence]] with [[model-heterogeneity]]
- **Concurrent specialist perspectives**: Multiple domains must be assessed simultaneously during time-critical events
- **Adversarial challenge**: Productive disagreement requires genuine independence (same-model debate suppresses independent reasoning)

## When Multi-Agent is Overkill

- Shift handover summaries (Pattern 7 single agent suffices)
- Document retrieval and synthesis
- Simple parameter monitoring
- Any task where a single agent with good tools produces adequate results

## The Graded Approach

Report 4 Scenario 8 proposes adaptive architecture: single-agent during normal operations, escalating to multi-agent during transients. Match complexity to need.
