---
title: "Cognitive Load and Agent Supervision Limits"
type: concept
sources:
  - raw/reports/report2-multiagent-v10.md
  - raw/reports/report3-nuclear-v11.md
related:
  - "[[situation-awareness]]"
  - "[[human-authority]]"
  - "[[delivery-modes]]"
  - "[[hsi-architecture]]"
  - "[[automation-bias]]"
tags:
  - human-factors
  - safety
  - multi-agent
confidence: high
created: 2026-04-13
updated: 2026-04-13
---

# Cognitive Load and Agent Supervision Limits

How many agents can a human meaningfully supervise? The answer is not a fixed number but depends on agent output rate, cognitive demand of evaluating each output, and the operator's concurrent operational tasks.

## Capacity Estimates

- **Normal operations** (low agent output rates): A single operator can track 4-6 agents
- **During transient** (high output rates + concurrent manual tasks): Even 3 agents may exceed processing capacity

The relevant cognitive constraints are **Wickens' Multiple Resource Theory (MRT)** — cognitive resources are limited and divided across visual, auditory, cognitive, and motor channels — and **Cowan's 4-chunk working memory limit** — the operator can actively maintain approximately 4 independent items in working memory.

## Attention Management

When multiple agents produce simultaneous output, the operator must decide which to attend to first. Without architectural support, humans default to **recency or salience** rather than safety significance. An agent reporting a minor anomaly in vivid language may capture attention ahead of an agent reporting a significant trend in neutral language.

The **SA Bridge** role and [[delivery-modes|delivery mode controls]] impose priority ordering that unaided attention allocation would not achieve.

## The Degradation Curve

Adding agents improves system coverage up to a point, beyond which coordination overhead and human cognitive load cause **net performance to decline**. The location of this inflection point is unknown and likely task-dependent. A 3-agent architecture may provide better effective coverage than a 6-agent architecture if the operator can maintain [[situation-awareness]] across 3 agents but not across 6.

No published study has characterised this curve for LLM-based multi-agent systems. Its empirical determination is a prerequisite for sizing multi-agent deployments and is a key investigation at Level 7 of the [[capability-gradient]].

## Design Implications

- Agent count must be matched to operator capacity, not to available technology
- [[delivery-modes]] (flow gating, priority ordering) are essential, not optional
- The [[hsi-architecture]] must support rapid situation assessment without requiring the operator to process every agent's full output
- Adaptive architectures that scale agent count to operational tempo (fewer during normal ops, more during transients) address the variable nature of cognitive load
